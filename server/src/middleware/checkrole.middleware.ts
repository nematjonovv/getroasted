import { Request, Response, NextFunction } from "express"

export const checkRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role

    if (!userRole) {
      res.status(401).json({ success: false, message: "Token required" })
      return
    }

    if (!roles.includes(userRole)) {
      res.status(403).json({ success: false, message: "Ruxsat yo'q" })
      return
    }

    next()
  }
}
