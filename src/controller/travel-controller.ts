import { Response, NextFunction, Request } from "express";
import { UserRequest } from "../types/user-request";
import { TravelRequest } from "../model/travel-model";
import { TravelService } from "../service/travel-service";

export class TravelController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: TravelRequest = req.body as TravelRequest
            const response = await TravelService.create(request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await TravelService.getAll()
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
                return res.status(400).json({ message: "invalid id format" });
            }

            const response = await TravelService.getByID(id)
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
                return res.status(400).json({ message: "invalid id format" });
            }

            const request: TravelRequest = req.body as TravelRequest
            const response = await TravelService.update(id, request)
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
                return res.status(400).json({ message: "invalid id format" });
            }

            await TravelService.delete(id)
            res.status(200).json({
                message: "travel successfully deleted"
            })
        } catch(e) {
            next(e)
        }
    }
}