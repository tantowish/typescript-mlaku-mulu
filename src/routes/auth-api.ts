import express from 'express'
import { UserController } from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/v1/users', UserController.get)
apiRouter.patch('/api/v1/users', UserController.update)

// Travel History 

