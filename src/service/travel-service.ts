import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { Validation } from "../validation/validation";
import { TravelStatus } from "@prisma/client";
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
                destination: true
            }
        })

        return toTravelResponse({
            ...travel,
            destination: travel.destination,
        })
    }

    static async getAll(
        page: number = 1, 
        limit: number = 10, 
        status?: TravelStatus
    ): Promise<{ data: TravelResponse[], total: number, page: number, limit: number }> {
        const skip = (page - 1) * limit;
    
        const filter: any = {};
        if (status) {
            filter.status = status;
        }
    
        const travels = await prismaClient.travel.findMany({
            where: filter,
            skip,
            take: limit,
            include: {
                destination: true
            }
        });
    
        const total = await prismaClient.travel.count({ where: filter });
    
        return {
            data: toTravelArrayResponse(travels.map(travel => ({
                ...travel,
                destination: travel.destination,
            }))),
            total,
            page,
            limit
        };
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
            },
            data: {
                ...travelRequest, 
                updated_at: new Date()
            },
            include: {
                destination: true
            }
        })

        return toTravelResponse({
            ...travel,
            destination: travel.destination,
        })
    }

    static async delete(travel_id: number): Promise<TravelResponse> {
        await this.checkTravelExist(travel_id)

        const travelDelete = await prismaClient.travel.delete({
            where: {
                id: travel_id
            },
            include: {
                destination: true
            }
        })

        return toTravelResponse({
            ...travelDelete,
            destination: travelDelete.destination,
        })
    }

    // Helper Function Section
    static async checkTravelExist(travel_id: number): Promise<TravelResponse> {
        const travelExist = await prismaClient.travel.findUnique({
            where: {
                id: travel_id
            },
            include: {
                destination: true
            }
        })

        if (!travelExist) {
            throw new ResponseErorr(404, "travel not found")
        }

        return toTravelResponse({
            ...travelExist,
            destination: travelExist.destination,
        })
    }
}