import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware"
import { likeController } from "./likes.controller"
const router = express.Router()

/**
 * @openapi
 * /api/likes/{portfolioId}:
 *   post:
 *     summary: Like bosish yoki olish (toggle)
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: portfolioId
 *         required: true
 *         schema:
 *           type: number
 *         description: Portfolio ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Like bosildi yoki olindi
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
 *                   example: "Liked"
 *                 data:
 *                   type: object
 *                   properties:
 *                     liked:
 *                       type: boolean
 *                       description: true - like bosildi, false - like olindi
 *                       example: true
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
 *       404:
 *         description: Portfolio topilmadi
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
 *                   example: "Portfolio topilmadi"
 */
router.post("/api/likes/:portfolioId", authMiddleware, likeController.toggle)








export const likeRouter = router