import { Request } from "express";

export interface UserRequest extends Request {
    user?: {
        username: string,
        email: string,
        name: string,
        role: string
    }
}