import { HistoryStatus } from "@prisma/client";
import { z, ZodType } from "zod";

export class TravelHistoryValidation {
    static readonly CREATE: ZodType = z.object({
        user_id: z.number().min(1),
        travel_id: z.number().min(1),
        status: z.nativeEnum(HistoryStatus),
    })

    static readonly UPDATE: ZodType = z.object({
        user_id: z.number().min(1),
        travel_id: z.number().min(1),
        status: z.nativeEnum(HistoryStatus),
    })
}   