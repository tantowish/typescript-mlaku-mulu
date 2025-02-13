import express from 'express'
import { UserController } from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'
import { TravelHistoryController } from '../controller/travel_history-controller'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/v1/users', UserController.get)
apiRouter.patch('/api/v1/users', UserController.update)

// Travel History 
apiRouter.get('/api/v1/users/:user_id/travel-histories', TravelHistoryController.getAllByUserID)
