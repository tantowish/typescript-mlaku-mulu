import { Response, NextFunction, Request } from "express";
import { UserRequest } from "../types/user-request";
import { DestinationRequest } from "../model/destination-model";
import { DestinationService } from "../service/destination-service";

export class DestinationController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: DestinationRequest = req.body as DestinationRequest
            const response = await DestinationService.create(request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await DestinationService.getAll()
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

            const response = await DestinationService.getByID(id)
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

            const request: DestinationRequest = req.body as DestinationRequest
            const response = await DestinationService.update(id, request)
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

            await DestinationService.delete(id)
            res.status(200).json({
                message: "Destination successfully deleted"
            })
        } catch(e) {
            next(e)
        }
    }
}