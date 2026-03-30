import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware"
import { ValidateBody } from "../../middleware/validate.middleware"
import { roastSchema } from "./roast.validation"
import { roastController } from "./roast.controller"
import { checkRole } from "../../middleware/checkrole.middleware"
const router = express.Router()


/**
 * @openapi
 * /api/roasts/{portfolioId}:
 *   post:
 *     summary: Portfolioga roast yozish
 *     tags: [Roasts]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Bu portfolio juda zo'r!"
 *     responses:
 *       201:
 *         description: Roast muvaffaqiyatli yozildi
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
 *                   example: "Roast published successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "Bu portfolio juda zo'r!"
 *                     portfolioId:
 *                       type: number
 *                       example: 1
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
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
router.post("/api/roasts/:portfolioId", authMiddleware, ValidateBody(roastSchema), roastController.create)

/**
 * @openapi
 * /api/roasts/{portfolioId}:
 *   get:
 *     summary: Portfolioga tegishli barcha roastlarni olish
 *     tags: [Roasts]
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
 *         description: Roastlar muvaffaqiyatli olindi
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
 *                       content:
 *                         type: string
 *                         example: "Bu portfolio juda zo'r!"
 *                       portfolioId:
 *                         type: number
 *                         example: 1
 *                       userId:
 *                         type: number
 *                         example: 1
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "ali_valiyev"
 *                           avatar:
 *                             type: string
 *                             example: "https://cloudinary.com/avatar.jpg"
 *                       createdAt:
 *                         type: string
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         example: "2024-01-01T00:00:00.000Z"
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
router.get("/api/roasts/:portfolioId", roastController.getAll)


/**
 * @openapi
 * /api/roasts/{roastId}:
 *   delete:
 *     summary: Roastni o'chirish
 *     tags: [Roasts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roastId
 *         required: true
 *         schema:
 *           type: number
 *         description: Roast ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Roast muvaffaqiyatli o'chirildi
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
 *                   example: "Deleted"
 *       403:
 *         description: Ruxsat yo'q
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
 *                   example: "Ruxsat yo'q"
 *       404:
 *         description: Roast topilmadi
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
 *                   example: "Roast topilmadi"
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
router.delete("/api/roasts/:roastId", authMiddleware, checkRole("SUPERADMIN"), roastController.deleteRoast)

export const roastRouter = router
