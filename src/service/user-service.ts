import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { LoginRequest, RegisterRequest, UpdateUserRequest, UserResponse, UserTokenResponse, toUserResponse, toUserTokenResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "@prisma/client";

export class UserService {
    static async register(req: RegisterRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, req)

        const duplicateEmail = await prismaClient.user.findMany({
            where: {
                email: registerRequest.email
            }
        })

        if (duplicateEmail.length > 0) {
            throw new ResponseErorr(400, "email has already taken")
        }

        const duplicateUsername = await prismaClient.user.findMany({
            where: {
                username: registerRequest.username
            }
        })

        if (duplicateUsername.length > 0) {
            throw new ResponseErorr(400, "username has already taken")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }

    static async login(req: LoginRequest): Promise<UserTokenResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, req)

        const user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email,
                deleted_at: null
            },
        })

        if (!user) {
            throw new ResponseErorr(404, "user not found")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        if (!isPasswordValid) {
            throw new ResponseErorr(401, "email or password is invalid")
        }

        return toUserTokenResponse(user, this.generateToken(user))
    }

    static async get(user: User): Promise<UserResponse> {
        user = await this.checkUserExist(user.id)
        return toUserResponse(user)
    }

    static async update(user: User, req: UpdateUserRequest): Promise<UserTokenResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, req)

        user = await this.checkUserExist(user.id)

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
            data: {
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
                updated_at: new Date()
            }
        })
        
        return toUserTokenResponse(userUpdate, this.generateToken(user))
    }

    // Helper Function Section
    static async checkUserExist(user_id: number): Promise<User> {
        const userExist = await prismaClient.user.findUnique({
            where: {
                id: user_id,
                deleted_at: null
            }
        })

        if (!userExist) {
            throw new ResponseErorr(404, "user not found")
        }

        return userExist
    }

    static generateToken(user: User): string {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            role: user.role
        }

        const secretKey = process.env.SECRET_KEY!
        const expiresIn = 60 * 60
        const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn })

        return token
    }
}