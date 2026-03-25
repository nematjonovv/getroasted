import 'dotenv/config'
import cors from "cors"
import express from "express"
import SwaggerUi from "swagger-ui-express"
import SwaggerSpec from "./config/swagger"
import { errorHandler } from './middleware/errorHandler.middleware'
import { authRouter } from './modules/auth/auth.route'
import { userRoute } from './modules/user/user.route'
import { portfolioRouter } from './modules/portfolios/portfolios.route'
import { roastRouter } from './modules/roast/roast.route'
import { likeRouter } from './modules/like/likes.route'
import { followRouter } from './modules/follow/follow.route'
import { adminRouter } from './modules/admin/admin.route'
import { searchRouter } from './modules/search/search.route'
import { notificationRoute } from './modules/notification/notification.route'
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

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})