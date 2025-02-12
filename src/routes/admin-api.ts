import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { TouristController } from '../controller/tourist-controller'
import { DestinationController } from '../controller/destination-controller'

export const apiAdmin = express.Router()

apiAdmin.use(authMiddleware)

// Tourist API
apiAdmin.get('/api/v1/tourists', TouristController.getAll)
apiAdmin.get('/api/v1/tourists/:id', TouristController.getByID)
apiAdmin.post('/api/v1/tourists', TouristController.create)
apiAdmin.put('/api/v1/tourists/:id', TouristController.update)
apiAdmin.delete('/api/v1/tourists/:id', TouristController.delete)

// Destination
apiAdmin.get('/api/v1/destinations', DestinationController.getAll)
apiAdmin.get('/api/v1/destinations/:id', DestinationController.getByID)
apiAdmin.post('/api/v1/destinations', DestinationController.create)
apiAdmin.put('/api/v1/destinations/:id', DestinationController.update)
apiAdmin.delete('/api/v1/destinations/:id', DestinationController.delete)

// Travel 


// Tourist Travel API
