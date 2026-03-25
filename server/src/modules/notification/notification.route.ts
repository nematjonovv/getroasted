import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware"
import { notificationController } from "./notification.controller"
const router = express.Router()


/**
 * @openapi
 * /api/messages:
 *   get:
 *     summary: Login bo'lgan userning notificationlarini olish
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notificationlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       type:
 *                         type: string
 *                         enum: [like, follow, roast, ban]
 *                         example: "like"
 *                       message:
 *                         type: string
 *                         example: "ali_valiyev liked your portfolio"
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       toUserId:
 *                         type: number
 *                         example: 2
 *                       fromUserId:
 *                         type: number
 *                         example: 1
 *                       fromUser:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: "ali_valiyev"
 *                           avatar:
 *                             type: string
 *                             nullable: true
 *                             example: "https://example.com/avatar.jpg"
 *                       createdAt:
 *                         type: string
 *                         example: "2024-01-01T00:00:00.000Z"
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
router.get("/api/messages", authMiddleware, notificationController.getMessages)

/**
 * @openapi
 * /api/messages/unread-count:
 *   get:
 *     summary: O'qilmagan notificationlar sonini olish
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: O'qilmagan notificationlar soni
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: number
 *                       example: 5
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
router.get("/api/messages/unread-count", authMiddleware, notificationController.getUnredCount)



export const notificationRoute = router