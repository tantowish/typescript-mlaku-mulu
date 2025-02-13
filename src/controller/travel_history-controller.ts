import { Response, NextFunction, Request } from "express";
import { UserRequest } from "../types/user-request";
import { HistoryStatus, User } from "@prisma/client";
import { TravelHistoryRequest } from "../model/travel_history-model";
import { TravelHistoryService } from "../service/travel_history-service";

export class TravelHistoryController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: TravelHistoryRequest = req.body as TravelHistoryRequest
            const response = await TravelHistoryService.create(request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const status = req.query.status as HistoryStatus | undefined
    
            const response = await TravelHistoryService.getAll(page, limit, status);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    

    static async getByID(req: Request, res: Response, next: NextFunction){
        try {
            const response = await TravelHistoryService.getByID(req.params.history_id)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: TravelHistoryRequest = req.body as TravelHistoryRequest
            const response = await TravelHistoryService.update(req.params.history_id, request)
            res.status(200).json({
                data: response
            })
        } catch (e){
            next(e)
        }
    }
    
    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await TravelHistoryService.delete(req.params.history_id)
            res.status(200).json({
                message: "travel history successfully deleted"
            })
        } catch(e) {
            next(e)
        }
    }

    static async getAllByUserID(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user_id = parseInt(req.params.user_id, 10);
            if (isNaN(user_id)) {
                return res.status(400).json({ message: "invalid id format" });
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const status = req.query.status as HistoryStatus | undefined
    
            const response = await TravelHistoryService.getAllByUserID(req.user as User, user_id, page, limit, status);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}