import { NextFunction, Request, Response } from "express"
import { followService } from "./follow.service"

class FollowController {
  async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const followerId = Number(req.user?.id)
      const followingId = Number(req.params.userId)

      const result = await followService.toggleFollow(followerId, followingId)

      res.status(200).json({ message: "Followed", success: true, data: result })
    } catch (error) {
      next(error)
    }
  }
}


export const followController = new FollowController()
