import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { changePaswordDto } from "./user.validation";

class UserController {
  async getByUserName(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params
      const currentUserId = Number(req.user?.id)
      const user = await userService.getByUserName(String(username), currentUserId)

      res.status(200).json({ success: true, data: user })

    } catch (error) {
      next(error)
    }
  }
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id
      const data = req.body

      const result = await userService.updatedProfile(Number(id), data)

      res.status(200).json({ success: true, message: "Updated success" })
    } catch (error) {
      next(error)
    }
  }
  async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id
      const file = req.file!

      const result = await userService.updateAvatar(Number(id), file)

      res.status(200).json({ success: true, message: "Updated success" })
    } catch (error) {
      next(error)
    }
  }
  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id

      const deleted = await userService.deleteProfile(Number(id))

      res.status(200).json({ message: "Deleted success", success: true })
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.user?.id)
      const { newPassword, oldPassword } = req.body as changePaswordDto
      const updatedPasword = await userService.changePassword(id, newPassword, oldPassword)

      res.status(200).json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()