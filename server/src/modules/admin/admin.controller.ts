import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import { changeRoleDto } from "./admin.validation";

class AdminController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {

      const users = await adminService.getUsers()
      res.status(200).json({ message: "Users retrived successfully", success: true, data: users })
    } catch (error) {
      next(error)
    }
  }
  async removeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const deleted = await adminService.removeUser(id)
      res.status(200).json({ message: `${deleted.username} deleted successfully`, success: true, data: deleted })
    } catch (error) {
      next(error)
    }
  }

  async banUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const banned = await adminService.banUser(id)

      res.status(200).json({ message: `${banned.username} ${banned.isBanned ? "banned" : "unbunned"} successfully`, success: true })
    } catch (error) {
      next(error)
    }
  }
  async changeRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const { role } = req.body as changeRoleDto
      const result = await adminService.changeRole(id, role)

      res.status(200).json({ message: "Role changed successfully", success: true })
    } catch (error) {
      next(error)
    }
  }

  async getPortfolios(req: Request, res: Response, next: NextFunction) {
    try {
      const title = req.query.search as string || ""
      const sort = req.query.sort as "newest" | "oldest"
      const portfolios = await adminService.getPortfolios(title, sort)
      res.status(200).json({ message: "Portfolios retrieved successfully", success: true, data: portfolios })
    } catch (error) {
      next(error)
    }
  }

  async removePortfolio(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const deleted = await adminService.removePortfolio(id)
      res.status(200).json({ message: "Portfolio deleted successfully", success: true, data: deleted })
    } catch (error) {
      next(error)
    }
  }

  async getRoasts(req: Request, res: Response, next: NextFunction) {
    try {
      const roasts = await adminService.getRoasts()
      res.status(200).json({ message: "Roasts retrieved successfully", success: true, data: roasts })
    } catch (error) {
      next(error)
    }
  }

  async removeRoast(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const deleted = await adminService.removeRoast(id)
      res.status(200).json({ message: "Roast deleted successfully", success: true, data: deleted })
    } catch (error) {
      next(error)
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await adminService.getStats()
      res.status(200).json({ message: "Stats retrieved successfully", success: true, data: stats })
    } catch (error) {
      next(error)
    }
  }

}


export const adminController = new AdminController()