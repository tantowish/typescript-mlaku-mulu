import { Role } from "@prisma/client";
import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().min(1).max(100),
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
        role: z.nativeEnum(Role).optional()
    })

    static readonly LOGIN: ZodType = z.object({
        password: z.string().min(1).max(100),
        email: z.string().min(1).max(100)
    })

    static readonly UPDATE: ZodType = z.object({
        email: z.string().min(1).max(100).optional(),
        username: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(100).optional(),
        password: z.string().min(1).max(12).optional()
    })
}   