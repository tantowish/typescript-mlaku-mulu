import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { RegisterRequest, UpdateUserRequest, UserResponse, toUserResponse, toUserArrayResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from 'bcrypt'
import { Destination, Role, Travel, User } from "@prisma/client";
import { DestinationRequest, DestinationResponse, toDestinationArrayResponse, toDestinationResponse } from "../model/destination-model";
import { DestinationValidation } from "../validation/destination-validation";
import { TravelValidation } from "../validation/travel-validation";
import { toTravelArrayResponse, toTravelResponse, TravelRequest, TravelResponse } from "../model/travel-model";
import { DestinationService } from "./destination-service";

export class TravelService {
    static async create(req: TravelRequest): Promise<TravelResponse> {
        const travelRequest = Validation.validate(TravelValidation.CREATE, req)
        if (travelRequest.start_date >= travelRequest.end_date) {
            throw new ResponseErorr(400, "start_date must be earlier than end_date")
        }

        const destination = await DestinationService.checkDestinationExist(travelRequest.destination_id)
        if (!destination.is_active) {
            throw new ResponseErorr(404, "destination not found")
        }

        const travel = await prismaClient.travel.create({
            data: travelRequest,
            include: {
                Destination: true
            }
        })

        return toTravelResponse({
            ...travel,
            destination: travel.Destination,
        })
    }

    static async getAll(): Promise<TravelResponse[]> {
        const travels = await prismaClient.travel.findMany({
            include: {
                Destination: true
            }
        });
    
        return toTravelArrayResponse(travels.map(travel => ({
            ...travel,
            destination: travel.Destination,
        })))
    }
    
    static async getByID(travel_id: number): Promise<TravelResponse> {
        const travel = await this.checkTravelExist(travel_id)
        return travel
    }

    static async update(travel_id: number, req: TravelRequest): Promise<TravelResponse> {
        const travelRequest = Validation.validate(TravelValidation.UPDATE, req)
        if (travelRequest.start_date >= travelRequest.end_date) {
            throw new ResponseErorr(400, "start_date must be earlier than end_date")
        }

        const destination = await DestinationService.checkDestinationExist(travelRequest.destination_id)
        if (!destination.is_active) {
            throw new ResponseErorr(404, "destination not found")
        }
        await this.checkTravelExist(travel_id)

        const travel = await prismaClient.travel.update({
            where: {
                id: travel_id,
                destination_id: travelRequest.destination_id
            },
            data: travelRequest,
            include: {
                Destination: true
            }
        })

        return toTravelResponse({
            ...travel,
            destination: travel.Destination,
        })
    }

    static async delete(travel_id: number): Promise<TravelResponse> {
        await this.checkTravelExist(travel_id)

        const travelDelete = await prismaClient.travel.delete({
            where: {
                id: travel_id
            },
            include: {
                Destination: true
            }
        })

        return toTravelResponse({
            ...travelDelete,
            destination: travelDelete.Destination,
        })
    }

    // Helper Function Section
    static async checkTravelExist(travel_id: number): Promise<TravelResponse> {
        const travelExist = await prismaClient.travel.findUnique({
            where: {
                id: travel_id
            },
            include: {
                Destination: true
            }
        })

        if (!travelExist) {
            throw new ResponseErorr(404, "travel not found")
        }

        return toTravelResponse({
            ...travelExist,
            destination: travelExist.Destination,
        })
    }
}