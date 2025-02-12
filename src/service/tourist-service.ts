import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { RegisterRequest, UpdateUserRequest, UserResponse, toUserResponse, toUserArrayResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from 'bcrypt'
import { Role, User } from "@prisma/client";

export class TouristService {
    static async create(req: RegisterRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, req)

        const duplicateEmail = await prismaClient.user.findMany({
            where: {
                email: registerRequest.email
            }
        })

        if (duplicateEmail.length > 0) {
            throw new ResponseErorr(400, "email has already taken")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        registerRequest.role = Role.tourist
        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }

    static async getAll(): Promise<UserResponse[]> {
        const tourists = await prismaClient.user.findMany({
            where: {
                role: Role.tourist,
                deleted_at: null
            }
        })

        return toUserArrayResponse(tourists)
    }

    static async getByID(id: number): Promise<UserResponse> {
        const tourist = await this.checkTouristExist(id )

        return toUserResponse(tourist)
    }

    static async update(id: number, req: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, req)

        const user = await this.checkTouristExist(id)

        if (updateRequest.name) {
            user.name = updateRequest.name
        }

        if (updateRequest.email && updateRequest.email != user.email) {
            const checkEmail = await prismaClient.user.findUnique({
                where: {
                    email: updateRequest.email
                }
            })

            if (checkEmail) {
                throw new ResponseErorr(400, "email has already taken")
            }

            user.email = updateRequest.email
        }

        if (updateRequest.username && updateRequest.username != user.username) {
            const checkUsername = await prismaClient.user.findUnique({
                where: {
                    username: updateRequest.username
                }
            })

            if (checkUsername) {
                throw new ResponseErorr(400, "username has already taken")
            }

            user.username = updateRequest.username
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const userUpdate = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: user
        })

        return toUserResponse(userUpdate)
    }

    static async delete(id: number): Promise<UserResponse> {
        const user = await this.checkTouristExist(id)
        const timestamp = Date.now()

        user.deleted_at = new Date()
        user.email = `deleted_${user.email}_${timestamp}`
        user.username = `deleted_${user.username}_${timestamp}`

        const userDelete = await prismaClient.user.update({
            where: {
                id: id
            },
            data: user
        })

        return toUserResponse(userDelete)
    }

    // Helper Function Section
    static async checkTouristExist(user_id: number): Promise<User> {
        const userExist = await prismaClient.user.findUnique({
            where: {
                id: user_id,
                role: Role.tourist,
                deleted_at: null
            }
        })

        if (!userExist) {
            throw new ResponseErorr(404, "tourist not found")
        }

        return userExist
    }
}