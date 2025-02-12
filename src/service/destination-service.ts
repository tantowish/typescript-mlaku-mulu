import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { RegisterRequest, UpdateUserRequest, UserResponse, toUserResponse, toUserArrayResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from 'bcrypt'
import { Destination, Role, User } from "@prisma/client";
import { DestinationRequest, DestinationResponse, toDestinationArrayResponse, toDestinationResponse } from "../model/destination-model";
import { DestinationValidation } from "../validation/destination-validation";

export class DestinationService {
    static async create(req: DestinationRequest): Promise<DestinationRequest> {
        const destinationRequest = Validation.validate(DestinationValidation.CREATE, req)

        const destination = await prismaClient.destination.create({
            data: destinationRequest
        })

        return toDestinationResponse(destination)
    }

    static async getAll(): Promise<DestinationResponse[]> {
        const destinations = await prismaClient.destination.findMany()
        return toDestinationArrayResponse(destinations)
    }

    static async getByID(id: number): Promise<DestinationResponse> {
        const destination = await prismaClient.destination.findUnique({
            where: {
                id: id
            }
        })

        if (!destination) {
            throw new ResponseErorr(404, "Destination not found")
        }

        return toDestinationResponse(destination)
    }

    static async update(destination_id: number, req: DestinationRequest): Promise<DestinationRequest> {
        const destination = await this.checkDestinationExist(destination_id)

        return toDestinationResponse(destination)
    }

    static async delete(destination_id: number): Promise<DestinationRequest> {
        await this.checkDestinationExist(destination_id)

        const destinationDelete = await prismaClient.destination.delete({
            where: {
                id: destination_id
            }
        })

        return toDestinationResponse(destinationDelete)
    }

    // Helper Function Section
    static async checkDestinationExist(destination_id: number): Promise<Destination> {
        const destinationExsist = await prismaClient.destination.findUnique({
            where: {
                id: destination_id
            }
        })

        if (!destinationExsist) {
            throw new ResponseErorr(404, "Destination not found")
        }

        return destinationExsist
    }
}