import { NextFunction, Request, Response } from "express";
import { likeService } from "./likes.service";

class LikeController {
  async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolioId = Number(req.params.portfolioId)
      const userId = Number(req.user?.id)

      const isLike = await likeService.toggle(portfolioId, userId)

      res.status(200).json({ message: "Liked", success: true, data: isLike })
    } catch (error) {
      next(error)
    }
  }


}


export const likeController = new LikeController()