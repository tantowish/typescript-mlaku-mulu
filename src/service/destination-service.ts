import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { Validation } from "../validation/validation";
import { Destination } from "@prisma/client";
import { DestinationRequest, DestinationResponse, toDestinationArrayResponse, toDestinationResponse } from "../model/destination-model";
import { DestinationValidation } from "../validation/destination-validation";

export class DestinationService {
    static async create(req: DestinationRequest): Promise<DestinationResponse> {
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

    static async getByID(travel_id: number): Promise<DestinationResponse> {
        const destination = await this.checkDestinationExist(travel_id)
        return toDestinationResponse(destination)
    }

    static async update(destination_id: number, req: DestinationRequest): Promise<DestinationResponse> {
        const destinationRequest = Validation.validate(DestinationValidation.UPDATE, req)

        await this.checkDestinationExist(destination_id)

        const destinationUpdate = await prismaClient.destination.update({
            where: {
                id: destination_id
            },
            data: destinationRequest
        })

        return toDestinationResponse(destinationUpdate)
    }

    static async delete(destination_id: number): Promise<DestinationResponse> {
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
            throw new ResponseErorr(404, "destination not found")
        }

        return destinationExsist
    }
}