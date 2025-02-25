import { Request, Response, NextFunction } from "express";
import { ResponseErorr } from "../error/reponse-error";
import jwt from 'jsonwebtoken'
import { UserRequest } from "../types/user-request";
import { UserResponse } from "../model/user-model";
import { Role } from "@prisma/client";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({
            error: "Token is required"
        }).end()
        return
    }

    const token = authorization.split(' ')[1];
    const secretKey = process.env.SECRET_KEY!

    try {
        const jwtDecode = jwt.verify(token, secretKey)

        if (typeof jwtDecode !== 'string') {
            req.user = jwtDecode as UserResponse
        }

        if (req.user?.role != Role.admin) {
            res.status(401).json({
                error: "unauthorized"
            }).end()
        }
    } catch (error) {
        res.status(401).json({
            error: "unauthorized"
        }).end()
        return
    }
    next()
    return
}