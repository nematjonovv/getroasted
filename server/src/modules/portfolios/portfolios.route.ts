import express from "express"
import { portfolioController } from "./portfolios.controller"
import { authMiddleware } from "../../middleware/auth.middleware"
import { ValidateBody } from "../../middleware/validate.middleware"
import { createPortfolioSchema, updatePortfolioSchema } from "./portfolios.validation"
import { uploadPortfolio } from "../../middleware/upload.middleware"
import { checkRole } from "../../middleware/checkrole.middleware"
const router = express.Router()

/**
 * @openapi
 * /api/portfolios:
 *   get:
 *     summary: Barcha portfoliolarni olish
 *     tags: [Portfolios]
 *     responses:
 *       200:
 *         description: Portfoliolar muvaffaqiyatli olindi
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
 *                   example: "Portfolios retrived success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "My Portfolio"
 *                       description:
 *                         type: string
 *                         example: "Portfolio description"
 *                       liveLink:
 *                         type: string
 *                         example: "https://myportfolio.com"
 *                       views:
 *                         type: number
 *                         example: 0
 *                       userId:
 *                         type: number
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       updatedAt:
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
router.get("/api/portfolios", authMiddleware, portfolioController.getAll)

/**
 * @openapi
 * /api/portfolios/{id}:
 *   get:
 *     summary: ID bo'yicha portfolioni olish
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Portfolio ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Portfolio muvaffaqiyatli olindi
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
 *                     id:
 *                       type: number
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "My Portfolio"
 *                     description:
 *                       type: string
 *                       example: "Portfolio description"
 *                     liveLink:
 *                       type: string
 *                       example: "https://myportfolio.com"
 *                     views:
 *                       type: number
 *                       example: 0
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
 *                   example: "Portfolio not found"
 */
router.get("/api/portfolios/:id", authMiddleware, portfolioController.getById)

/**
 * @openapi
 * /api/portfolios:
 *   post:
 *     summary: Yangi portfolio yaratish
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - portfolio_image
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: "My Portfolio"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "Portfolio description"
 *               liveLink:
 *                 type: string
 *                 format: uri
 *                 example: "https://myportfolio.com"
 *               portfolio_image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *     responses:
 *       201:
 *         description: Portfolio muvaffaqiyatli yaratildi
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
 *                   example: "Portfolio muvaffaqoyatli yaratildi"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "My Portfolio"
 *                     description:
 *                       type: string
 *                       example: "Portfolio description"
 *                     liveLink:
 *                       type: string
 *                       example: "https://myportfolio.com"
 *                     views:
 *                       type: number
 *                       example: 0
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     portfolioImages:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 1
 *                           imageUrl:
 *                             type: string
 *                             example: "https://cloudinary.com/image.jpg"
 *                           portfolioId:
 *                             type: number
 *                             example: 1
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: Rasm majburiy yoki validation xatosi
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
 *                   example: "Rasm majburiy"
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
router.post("/api/portfolios", authMiddleware, uploadPortfolio.array("portfolio_image", 5), (req, res, next) => {
  console.log("multer dan keyin body:", req.body)  // shu yerda nima bor?
  next()
}, ValidateBody(createPortfolioSchema), portfolioController.create)

/**
 * 
 * @openapi
 * /api/portfolios/{username}:
 *   get:
 *     summary: Username bo'yicha portfoliolarni olish
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: User username
 *         example: "ali_valiyev"
 *     responses:
 *       200:
 *         description: Portfoliolar muvaffaqiyatli olindi
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
 *                     id:
 *                       type: number
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "ali_valiyev"
 *                     portfolios:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: "My Portfolio"
 *                           description:
 *                             type: string
 *                             example: "Portfolio description"
 *                           liveLink:
 *                             type: string
 *                             example: "https://myportfolio.com"
 *                           views:
 *                             type: number
 *                             example: 10
 *                           userId:
 *                             type: number
 *                             example: 1
 *                           portfolioImages:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: number
 *                                   example: 1
 *                                 imageUrl:
 *                                   type: string
 *                                   example: "https://cloudinary.com/image.jpg"
 *                                 portfolioId:
 *                                   type: number
 *                                   example: 1
 *                           createdAt:
 *                             type: string
 *                             example: "2024-01-01T00:00:00.000Z"
 *                           updatedAt:
 *                             type: string
 *                             example: "2024-01-01T00:00:00.000Z"
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
router.get("/api/portfolios/:username", portfolioController.getByUsername)

/**
 * @openapi
 * /api/portfolios/{id}:
 *   put:
 *     summary: Portfolioni yangilash
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: "My Portfolio"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: "Portfolio description"
 *               liveLink:
 *                 type: string
 *                 format: uri
 *                 example: "https://myportfolio.com"
 *     responses:
 *       200:
 *         description: Portfolio muvaffaqiyatli yangilandi
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
 *                   example: "Updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "My Portfolio"
 *                     description:
 *                       type: string
 *                       example: "Portfolio description"
 *                     liveLink:
 *                       type: string
 *                       example: "https://myportfolio.com"
 *                     views:
 *                       type: number
 *                       example: 10
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
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
router.put("/api/portfolios/:id", authMiddleware, ValidateBody(updatePortfolioSchema), portfolioController.update)

/**
 * @openapi
 * /api/portfolios/{id}:
 *   delete:
 *     summary: Portfolioni o'chirish
 *     tags: [Portfolios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Portfolio ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Portfolio muvaffaqiyatli o'chirildi
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
 *                   example: "deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "My Portfolio"
 *                     description:
 *                       type: string
 *                       example: "Portfolio description"
 *                     liveLink:
 *                       type: string
 *                       example: "https://myportfolio.com"
 *                     views:
 *                       type: number
 *                       example: 10
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
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
router.delete("/api/portfolios/:id", authMiddleware, checkRole("SUPERADMIN"), portfolioController.delete)
export const portfolioRouter = router