import { Destination } from "@prisma/client"

export type DestinationResponse = {
    id: number
    city: string
    country: string
    latitude: number
    longitude: number
    is_active: boolean
}

export type DestinationRequest = {
    city: string
    country: string
    latitude: number
    longitude: number
    is_active: boolean
}

export function toDestinationResponse(destination: Destination): DestinationResponse {
    return {
        id: destination.id,
        city: destination.city,
        country: destination.country,
        latitude: destination.latitude,
        longitude: destination.longitude,
        is_active: destination.is_active
    }
}

export function toDestinationArrayResponse(destinations: Destination[]): DestinationResponse[] {
    return destinations.map(destination => ({
        id: destination.id,
        city: destination.city,
        country: destination.country,
        latitude: destination.latitude,
        longitude: destination.longitude,
        is_active: destination.is_active
    }));
}