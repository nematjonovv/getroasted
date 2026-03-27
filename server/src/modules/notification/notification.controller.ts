import { NextFunction, Request, Response } from "express";
import { userNotificationService } from "./notification.service";

class NotificationController {
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id)
      const messages = await userNotificationService.getMessages(userId)

      res.status(200).json({ success: true, data: messages })
    } catch (error) {
      next(error)
    }
  }
  async getUnredCount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id)
      const count = await userNotificationService.getUndreadCount(userId)

      res.status(200).json({ success: true, data: count })
    } catch (error) {
      next(error)
    }
  }
  async markAllRed(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id)
      const count = await userNotificationService.markAllRead(userId)

      res.status(200).json({ success: true, data: count })
    } catch (error) {
      next(error)
    }
  }
}


export const notificationController = new NotificationController()