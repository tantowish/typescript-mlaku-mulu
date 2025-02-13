import { z, ZodType } from "zod";

export class DestinationValidation {
    static readonly CREATE: ZodType = z.object({
        city: z.string().min(1).max(100),
        country: z.string().min(1).max(100),
        latitude: z.number(),
        longitude: z.number(),
        is_active: z.boolean().optional()
    })

    static readonly UPDATE: ZodType = z.object({
        city: z.string().min(1).max(100),
        country: z.string().min(1).max(100),
        latitude: z.number(),
        longitude: z.number(),
        is_active: z.boolean()
    })
}   