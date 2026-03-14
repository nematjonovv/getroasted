import { NextFunction, Request, Response } from "express"
import { roastService } from "./roast.service"

class RoastController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolioId = Number(req.params.portfolioId)
      const userId = Number(req.user?.id)
      const content = req.body
      const roast = await roastService.post(portfolioId, userId, content)

      res.status(201).json({ message: "Roast published successfully", success: true, data: roast })
    } catch (error) {
      next(error)
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolioId = Number(req.params.portfolioId)
      const roasts = await roastService.getAll(portfolioId)

      res.status(200).json({ success: true, data: roasts })
    } catch (error) {
      next(error)
    }
  }
  async deleteRoast(req: Request, res: Response, next: NextFunction) {
    try {
      const roastId = Number(req.params.roastId)
      const userId = Number(req.user?.id)

      const deleted = await roastService.deleteRoast(roastId, userId)

      res.status(200).json({ message: "Deleted", success: true, data: deleted })
    } catch (error) {
      next(error)
    }
  }
}

export const roastController = new RoastController()