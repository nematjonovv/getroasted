import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware"
import { searchController } from "./search.controller"
const router = express.Router()


/**
* @openapi
* /api/search:
*   get:
*     summary: Username bo'yicha foydalanuvchilarni qidirish
*     tags: [Search]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: query
*         name: username
*         schema:
*           type: string
*         required: false
*         description: Qidirilayotgan username
*         example: "ali"
*     responses:
*       200:
*         description: Topilgan foydalanuvchilar ro'yxati
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 message:
*                   type: string
*                   example: "users"
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         example: 1
*                       username:
*                         type: string
*                         example: "ali_valiyev"
*                       avatar:
*                         type: string
*                         example: "https://example.com/avatar.jpg"
*                       profession:
*                         type: string
*                         example: "Developer"
*       401:
*         description: Token required
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: false
*                 message:
*                   type: string
*                   example: "Token required"
*/
router.get("/api/search", authMiddleware, searchController.search)

export const searchRouter = router