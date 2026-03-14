import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware"
import { checkRole } from "../../middleware/checkrole.middleware"
import { adminController } from "./admin.controller"
const router = express.Router()



/**
 * @openapi
 * /admin/users:
 *   get:
 *     summary: Barcha userlarni olish
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Userlar muvaffaqiyatli olindi
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
 *                   example: "Users retrived successfully"
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
 *                       name:
 *                         type: string
 *                         example: "Ali"
 *                       secondname:
 *                         type: string
 *                         example: "Valiyev"
 *                       avatar:
 *                         type: string
 *                         example: "https://cloudinary.com/avatar.jpg"
 *                       role:
 *                         type: string
 *                         example: "USER"
 *                       portfolios:
 *                         type: array
 *                         items:
 *                           type: object
 *                       roasts:
 *                         type: array
 *                         items:
 *                           type: object
 *                       followers:
 *                         type: array
 *                         items:
 *                           type: object
 *                       following:
 *                         type: array
 *                         items:
 *                           type: object
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
 */
router.get("/admin/users", authMiddleware, checkRole("ADMIN", "SUPERADMIN"), adminController.getUsers)


/**
 * @openapi
 * /admin/users/{id}:
 *   delete:
 *     summary: Userni o'chirish
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User muvaffaqiyatli o'chirildi
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
 *                   example: "User deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "ali_valiyev"
 *                     email:
 *                       type: string
 *                       example: "ali@gmail.com"
 *                     role:
 *                       type: string
 *                       example: "USER"
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: Id required
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
 *                   example: "Id required"
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
router.delete("/admin/users/:id", authMiddleware, checkRole("SUPERADMIN"), adminController.removeUser)

/**
 * @openapi
 * /admin/users/{id}/ban:
 *   put:
 *     summary: Userni ban yoki unban qilish (toggle)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User ban yoki unban qilindi
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
 *                   example: "User banned"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "ali_valiyev"
 *                     isBanned:
 *                       type: boolean
 *                       description: true - banned, false - unbanned
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
router.put("/admin/users/:id/ban", authMiddleware, checkRole("SUPERADMIN"), adminController.banUser)

/**
 * @openapi
 * /admin/users/{id}/role:
 *   put:
 *     summary: User roleini o'zgartirish
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: User ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN, SUPERADMIN]
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: Role muvaffaqiyatli o'zgartirildi
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
 *                   example: "Role changed successfully"
 *       400:
 *         description: Noto'g'ri role
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
 *                   example: "Role faqat: USER, ADMIN, SUPERADMIN bo'lishi mumkin"
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
 *                   example: "User not found"
 */
router.put("/admin/users/:id/role", authMiddleware, checkRole("SUPERADMIN"), adminController.changeRole)
export const adminRouter = router