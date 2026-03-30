import 'dotenv/config'
import cors from "cors"
import express from "express"
import SwaggerUi from "swagger-ui-express"
import SwaggerSpec from "./config/swagger.js"
import { errorHandler } from './middleware/errorHandler.middleware.js'
import { authRouter } from './modules/auth/auth.route.js'
import { userRoute } from './modules/user/user.route.js'
import { portfolioRouter } from './modules/portfolios/portfolios.route.js'
import { roastRouter } from './modules/roast/roast.route.js'
import { likeRouter } from './modules/like/likes.route.js'
import { followRouter } from './modules/follow/follow.route.js'
import { adminRouter } from './modules/admin/admin.route.js'
import { searchRouter } from './modules/search/search.route.js'
import { notificationRoute } from './modules/notification/notification.route.js'
const app = express()
const PORT = 5000
app.use(express.json())


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use("/docs", SwaggerUi.serve)
app.get("/docs", SwaggerUi.setup(SwaggerSpec))
app.get("/docs-json", (req, res) => res.json(SwaggerSpec))

// Routes
app.use("/", authRouter)
app.use("/", userRoute)
app.use("/", portfolioRouter)
app.use("/", roastRouter)
app.use("/", likeRouter)
app.use("/", followRouter)
app.use("/", searchRouter)
app.use("/", notificationRoute)
app.use("/", adminRouter)
app.get("/test1", (req, res) => {
  res.json({ ok: true })
})
app.get("/test2", (req, res) => {
  res.json({ ok: true })
})

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})