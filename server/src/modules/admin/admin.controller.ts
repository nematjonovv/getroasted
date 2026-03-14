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


}


export const adminController = new AdminController()