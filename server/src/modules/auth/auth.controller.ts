import { NextFunction, Request, Response } from "express";
import { CreateUserDto, loginDto } from "./auth.validation";
import { authService } from "./auth.service.js";

type CtrlDto = {
  req: Request
  res: Response
  next: NextFunction
}
class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserDto = req.body
      const newUser = await authService.register(data)

      res.status(201).json({ success: true, message: "User created successfully", token: newUser })
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await authService.login(req.body)
      res.status(200).json({ success: true, message: "Logged in", token })
    } catch (error) {
      next(error)
    }
  }
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!
      const user = await authService.me(Number(id))

      res.status(200).json({ success: true, user })
    } catch (error) {
      next(error)
    }
  }
}

export const authController = new AuthController()
