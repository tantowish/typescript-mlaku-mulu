import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { TouristController } from '../controller/tourist-controller'

export const apiAdmin = express.Router()

apiAdmin.use(authMiddleware)

// Tourist API
apiAdmin.get('/api/v1/tourists', TouristController.getAll)
apiAdmin.get('/api/v1/tourists/:id', TouristController.getByID)
apiAdmin.post('/api/v1/tourists', TouristController.create)
apiAdmin.put('/api/v1/tourists/:id', TouristController.update)
apiAdmin.delete('/api/v1/tourists/:id', TouristController.delete)

// Destination

// Travel API

// Tourist Travel API
