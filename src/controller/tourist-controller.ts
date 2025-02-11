import { Response, NextFunction, Request } from "express";
import { UserRequest } from "../types/user-request";
import { User } from "@prisma/client";
import { TouristService } from "../service/tourist-service";
import { RegisterRequest, UpdateUserRequest } from "../model/user-model";

export class TouristController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterRequest = req.body as RegisterRequest
            const response = await TouristService.create(request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await TouristService.getAll()
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getByID(req: Request, res: Response, next: NextFunction){
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }

            const response = await TouristService.getByID(id)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }

            const request: UpdateUserRequest = req.body as UpdateUserRequest
            const response = await TouristService.update(id, request)
            res.status(200).json({
                data: response
            })
        } catch (e){
            next(e)
        }
    }
    
    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }

            await TouristService.delete(id)
            res.status(200).json({
                message: "Tourist successfully deleted"
            })
        } catch(e) {
            next(e)
        }
    }
}