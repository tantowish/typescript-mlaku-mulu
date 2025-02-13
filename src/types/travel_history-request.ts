import { TravelHistory } from "@prisma/client"
import { UserResponse } from "../model/user-model"
import { TravelResponse } from "../model/travel-model"

export interface TravelHistoryWithDetails  extends TravelHistory {
    user: UserResponse
    travel: TravelResponse
}