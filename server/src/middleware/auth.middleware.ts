import { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler.middleware";
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../lib/prisma";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(401, "Token required")
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id: string
      username: string
    }

    const user = await prisma.user.findUnique({ where: { id: Number(decoded.id) } })
    if (user?.isBanned) {
      res.status(403).json({ success: false, message: "Your account was banned" })
      return
    }
    req.user = decoded
    next()
  } catch (error) {
    throw new AppError(401, "Invalid or expired error")
  }
}


export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
        id: string
        username: string
      }
      req.user = decoded
    } catch { }
  }
  next()  // token bo'lmasa ham o'tkazib yuboradi
}
