import { NextFunction, Request, Response } from "express";
import { portfolioService } from "./portfolios.service";
import { createPortfolioDto, updatePortfolioDto } from "./portfolios.validation";

class PortfolioController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id)
      const allPortfolios = await portfolioService.getAll(userId)

      return res.status(200).json({ message: "Portfolios retrived success", success: true, data: allPortfolios })
    } catch (error) {
      next(error)
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const userId = Number(req.user?.id)
      const portfolio = await portfolioService.getById(id, userId)

      res.status(200).json({ success: true, data: portfolio })
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as createPortfolioDto
      const file = req.files as Express.Multer.File[]
      const userId = Number(req.user?.id)

      if (!file) {
        return res.status(400).json({ success: false, message: "Rasm majburiy" })
      }
      const portfolio = await portfolioService.create(data, file, userId)

      res.status(201).json({ message: "Portfolio muvaffaqoyatli yaratildi", success: true, data: portfolio })
    } catch (error) {
      next(error)
    }
  }

  async getByUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username)
      const portfolios = await portfolioService.getByUsername(username)

      res.status(200).json({ success: true, data: portfolios })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const data = req.body as updatePortfolioDto
      const userId = Number(req.user?.id)
      const updated = await portfolioService.update(id, userId, data)
      res.status(200).json({ message: "Updated successfully", success: true, data: updated })
    } catch (error) {
      next(error)
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const userId = Number(req.user?.id)
      const deleted = await portfolioService.delete(id, userId)
      res.status(200).json({ message: "deleted successfully", success: true, data: deleted })
    } catch (error) {
      next(error)
    }
  }

  async getFollowingPortfolios(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id)
      const portfololios = await portfolioService.getFollowingPortfolio(userId)

      res.status(200).json({ success: true, data: portfololios })
    } catch (error) {
      next(error)
    }
  }
  async incrementView(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolioId = Number(req.params.portfolioId)
      const userId = Number(req.user?.id)

      await portfolioService.incrementView(portfolioId, userId)

      res.status(200).json({ success: true, message: "Viewed" })
    } catch (error) {
      next(error)
    }
  }
}

export const portfolioController = new PortfolioController()