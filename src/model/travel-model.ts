import { Travel, TravelStatus } from "@prisma/client"
import { DestinationResponse } from "./destination-model"
import { TravelDestination } from "../types/travel-request"
 
 export type TravelResponse = {
    id: number
    destination_id: number
    start_date: Date
    end_date: Date
    status: TravelStatus
    created_at: Date
    updated_at: Date
    destination: DestinationResponse
 }

export type TravelRequest = {
    destination_id: number
    start_date: Date
    end_date: Date
    status: TravelStatus
}

export function toTravelResponse(travel: TravelDestination): TravelResponse {
    return {
        id: travel.id,
        destination_id: travel.destination_id,
        start_date: travel.start_date,
        end_date: travel.end_date,
        status: travel.status,
        created_at: travel.created_at,
        updated_at: travel.updated_at,
        destination: {
            id: travel.destination.id,
            city: travel.destination.city,
            country: travel.destination.country,
            latitude: travel.destination.latitude,
            longitude: travel.destination.longitude,
            is_active: travel.destination.is_active
        }
    }
}

export function toTravelArrayResponse(travels: TravelDestination[]): TravelResponse[] {
    return travels.map(travel => ({
        id: travel.id,
        destination_id: travel.destination_id,
        start_date: travel.start_date,
        end_date: travel.end_date,
        status: travel.status,
        created_at: travel.created_at,
        updated_at: travel.updated_at,
        destination: {
            id: travel.destination.id,
            city: travel.destination.city,
            country: travel.destination.country,
            latitude: travel.destination.latitude,
            longitude: travel.destination.longitude,
            is_active: travel.destination.is_active
        }
    }));
}