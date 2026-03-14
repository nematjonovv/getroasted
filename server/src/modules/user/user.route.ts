import express from "express";
import { userController } from "./user.controller";
import { authMiddleware, optionalAuth } from "../../middleware/auth.middleware";
import { ValidateBody } from "../../middleware/validate.middleware";
import { changePassworSchema, profileUpdateSchema } from "./user.validation";
import { uploadAvatar } from "../../middleware/upload.middleware";
const router = express.Router()

/**
 * @openapi
 * /api/users/{username}:
 *   get:
 *     summary: Username bo'yicha userni olish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "ali_valiyev"
 *     responses:
 *       200:
 *         description: User topildi
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
 *                     username:
 *                       type: string
 *                       example: "ali_valiyev"
 *                     name:
 *                       type: string
 *                       example: "Ali"
 *                     secondname:
 *                       type: string
 *                       example: "Valiyev"
 *                     profession:
 *                       type: string
 *                       example: "Frontend Developer"
 *                     avatar:
 *                       type: string
 *                       example: "https://example.com/avatar.png"
 *                     techstack:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["React", "TypeScript", "Node.js"]
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
 *                   example: "user not found"
 */
router.get("/api/users/:username", optionalAuth, userController.getByUserName)

/**
 * @openapi
 * /api/users/me:
 *   put:
 *     summary: Profilni yangilash
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "ali_valiyev"
 *               name:
 *                 type: string
 *                 example: "Ali"
 *               secondname:
 *                 type: string
 *                 example: "Valiyev"
 *               profession:
 *                 type: string
 *                 example: "Frontend Developer"
 *               bio:
 *                 type: string
 *                 example: "I am a developer"
 *               techstack:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "TypeScript", "Node.js"]
 *     responses:
 *       200:
 *         description: Profil yangilandi
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
 *                   example: "Updated success"
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
 *       400:
 *         description: Validation xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: object
 */
router.put("/api/users/me", authMiddleware, ValidateBody(profileUpdateSchema), userController.updateProfile)

/**
 * @openapi
 * /api/users/me/avatar:
 *   put:
 *     summary: Avatar yangilash
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar yangilandi
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
 *                   example: "Updated success"
 *       400:
 *         description: Fayl yuborilmadi
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
 *                   example: "File required"
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
router.put("/api/users/me/avatar", authMiddleware, uploadAvatar.single("avatar"), userController.updateAvatar)

/**
 * @openapi
 * /api/users/me:
 *   delete:
 *     summary: Profilni o'chirish
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil o'chirildi
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
 *                   example: "Deleted success"
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
router.delete("/api/users/me", authMiddleware, userController.deleteProfile)

/**
 * @openapi
 * /api/users/me/password:
 *   put:
 *     summary: Parolni yangilash
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "secret123"
 *               newPassword:
 *                 type: string
 *                 example: "newSecret123"
 *     responses:
 *       200:
 *         description: Parol yangilandi
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
 *                   example: "Password updated successfully"
 *       401:
 *         description: Eski parol xato
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
 *                   example: "Old password is incorrect"
 *       400:
 *         description: Validation xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: object
 */
router.put("/api/users/me/password", authMiddleware, ValidateBody(changePassworSchema), userController.changePassword)

export const userRoute = router
