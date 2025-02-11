import express from 'express'
import { Request, Response } from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'
import { apiRouter } from '../routes/auth-api'
import { apiAdmin } from '../routes/admin-api'

export const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Server is running" })
})

// Router
app.use(publicRouter)
app.use(apiRouter)
app.use(apiAdmin)

// Error middleware
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})