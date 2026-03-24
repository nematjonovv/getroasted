import { NextFunction, Request, Response } from "express";
import { searchService } from "./search.service";

class SearchController {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query.username as string || ""
      const users = await searchService.search(search)

      res.status(200).json({ success: true, message: "users", data: users })
    } catch (error) {
      next(error)
    }
  }
}

export const searchController = new SearchController()