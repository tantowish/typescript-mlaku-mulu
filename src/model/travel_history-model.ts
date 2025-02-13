import { HistoryStatus } from "@prisma/client"
import { TravelDestination } from "../types/travel-request"
import { UserResponse } from "./user-model"
import { TravelResponse } from "./travel-model"
import { TravelHistoryWithDetails } from "../types/travel_history-request"
 
 export type TravelHistoryResponse = {
    id: string
    user_id: number
    travel_id: number
    status: HistoryStatus
    created_at: Date
    updated_at: Date
    user: UserResponse
    travel: TravelResponse
 }

export type TravelHistoryRequest = {
    user_id: number
    travel_id: number
    status: HistoryStatus
}

export function toTravelHistoryResponse(travelHistory: TravelHistoryWithDetails): TravelHistoryResponse {
    return {
        id: travelHistory.id,
        user_id: travelHistory.user_id,
        travel_id: travelHistory.travel_id,
        status: travelHistory.status,
        created_at: travelHistory.created_at,
        updated_at: travelHistory.updated_at,
        user: {
            id: travelHistory.user.id,
            username: travelHistory.user.username,
            name: travelHistory.user.name,
            email: travelHistory.user.email,
            role: travelHistory.user.role,
            created_at: travelHistory.created_at,
            updated_at: travelHistory.updated_at
        },
        travel: {
            ...travelHistory.travel,
            destination: travelHistory.travel.destination
        }
    }
}

export function toTravelArrayResponse(travelHistories: TravelHistoryWithDetails[]): TravelHistoryResponse[] {
    return travelHistories.map(history => ({
        id: history.id,
        user_id: history.user_id,
        travel_id: history.travel_id,
        status: history.status,
        created_at: history.created_at,
        updated_at: history.updated_at,
        user: {
            id: history.user.id,
            username: history.user.username,
            name: history.user.name,
            email: history.user.email,
            role: history.user.role,
            created_at: history.created_at,
            updated_at: history.updated_at
        },
        travel: {
            ...history.travel,
            destination: history.travel.destination
        }
    }));
}