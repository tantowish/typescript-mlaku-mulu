import { TravelStatus } from "@prisma/client";
import { z, ZodType } from "zod";

export class TravelValidation {
    static readonly CREATE: ZodType = z.object({
        destination_id: z.number().min(1),
        start_date: z.date(),
        end_date: z.date(),
        status: z.nativeEnum(TravelStatus),
    })

    static readonly UPDATE: ZodType = z.object({
        destination_id: z.number().min(1),
        start_date: z.date(),
        end_date: z.date(),
        status: z.nativeEnum(TravelStatus),
    })
}   