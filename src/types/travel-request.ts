import { Travel } from "@prisma/client"
import { DestinationResponse } from "../model/destination-model"

export interface TravelDestination extends Travel {
    destination: DestinationResponse
}