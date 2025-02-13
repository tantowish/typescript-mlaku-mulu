import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { Validation } from "../validation/validation";
import { HistoryStatus, Role, TravelHistory, TravelStatus, User } from "@prisma/client";
import { TravelValidation } from "../validation/travel-validation";
import { toTravelArrayResponse, toTravelResponse, TravelRequest, TravelResponse } from "../model/travel-model";
import { DestinationService } from "./destination-service";
import { toTravelHistoryResponse, TravelHistoryRequest, TravelHistoryResponse } from "../model/travel_history-model";
import { TravelHistoryValidation } from "../validation/travel_history-validation ";
import { TravelService } from "./travel-service";
import { TouristService } from "./tourist-service";

export class TravelHistoryService {
    static async create(req: TravelHistoryRequest): Promise<TravelHistoryResponse> {
        const historyRequest = Validation.validate(TravelHistoryValidation.CREATE, req)

        await TouristService.checkTouristExist(historyRequest.user_id)
        await TravelService.checkTravelExist(historyRequest.travel_id)

        const travelHistory = await prismaClient.travelHistory.create({
            data: historyRequest,
            include: {
                user: true,
                travel: {
                    include: {
                        destination: true
                    }
                }
            }
        })

        return toTravelHistoryResponse(travelHistory)
    }

    static async getAll(
        page: number = 1, 
        limit: number = 10, 
        status?: HistoryStatus
    ): Promise<{ data: TravelHistoryResponse[], total: number, page: number, limit: number }> {
        const skip = (page - 1) * limit;

        const filter: any = {};
        if (status) {
            filter.status = status;
        }

        const histories = await prismaClient.travelHistory.findMany({
            where: filter,
            skip,
            take: limit,
            include: {
                user: true,
                travel: {
                    include: {
                        destination: true
                    }
                }
            }
        });

        const total = await prismaClient.travelHistory.count({ where: filter })

        return {
            data: histories.map(toTravelHistoryResponse),
            total,
            page,
            limit
        }
    }

    static async getByID(history_id: string): Promise<TravelHistoryResponse> {
        const history = await this.checkHistoryExist(history_id)
        return history
    }

    static async update(history_id: string, req: TravelHistoryRequest): Promise<TravelHistoryResponse> {
        const historyRequest = Validation.validate(TravelHistoryValidation.UPDATE, req)

        await TouristService.checkTouristExist(historyRequest.user_id)
        await TravelService.checkTravelExist(historyRequest.travel_id)
        await this.checkHistoryExist(history_id)

        const updatedHistory = await prismaClient.travelHistory.update({
            where: { id: history_id },
            data: historyRequest,
            include: {
                user: true,
                travel: {
                    include: {
                        destination: true
                    }
                }
            }
        })

        return toTravelHistoryResponse(updatedHistory)
    }

    static async delete(history_id: string): Promise<TravelHistoryResponse> {
        await this.checkHistoryExist(history_id)

        const deletedHistory = await prismaClient.travelHistory.update({
            where: { id: history_id },
            include: {
                user: true,
                travel: {
                    include: {
                        destination: true
                    }
                }
            },
            data: {
                deleted_at: new Date()
            }
        })

        return toTravelHistoryResponse(deletedHistory)
    }

    static async getAllByUserID(
        user: User,
        user_id: number,
        page: number = 1, 
        limit: number = 10, 
        status?: HistoryStatus
    ): Promise<{ data: TravelHistoryResponse[], total: number, page: number, limit: number }> {
        if (user.role == Role.tourist && user.id != user_id) {
            throw new ResponseErorr(401, "unauthorized")
        }

        await TouristService.checkTouristExist(user_id)
        
        const skip = (page - 1) * limit

        const filter: any = { user_id }
        if (status) {
            filter.status = status
        }

        const histories = await prismaClient.travelHistory.findMany({
            where: filter,
            skip,
            take: limit,
            include: {
                user: true,
                travel: {
                    include: {
                        destination: true
                    }
                }
            }
        })

        const total = await prismaClient.travelHistory.count({ where: filter })

        return {
            data: histories.map(toTravelHistoryResponse),
            total,
            page,
            limit
        }
    }

    // Helper Function Section
    static async checkHistoryExist(history_id: string): Promise<TravelHistoryResponse> {
        const historyExist = await prismaClient.travelHistory.findUnique({
            where: {
                id: history_id,
                deleted_at: null
            },
            include: {
                user: true,
                travel: {
                    include: {
                        destination: true
                    }
                }
            }
        })

        if (!historyExist) {
            throw new ResponseErorr(404, "travel history not found")
        }

        return toTravelHistoryResponse(historyExist)
    }
}