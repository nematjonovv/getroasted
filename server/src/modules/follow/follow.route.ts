import { authMiddleware } from "../../middleware/auth.middleware";
import express from "express"
import { followController } from "./follow.controller";
const router = express.Router()



/**
 * @openapi
 * /api/follow/{userId}:
 *   post:
 *     summary: Follow yoki unfollow qilish (toggle)
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: Follow qilinayotgan user ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Follow yoki unfollow qilindi
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
 *                   example: "Followed"
 *                 data:
 *                   type: object
 *                   properties:
 *                     followed:
 *                       type: boolean
 *                       description: true - follow qilindi, false - unfollow qilindi
 *                       example: true
 *       400:
 *         description: O'zingizga follow qila olmaysiz
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
 *                   example: "O'zingizga follow qila olmaysiz"
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
 *         description: User topilmadi
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
 *                   example: "User topilmadi"
 */
router.post("/api/follow/:userId", authMiddleware, followController.toggle)
export const followRouter = router