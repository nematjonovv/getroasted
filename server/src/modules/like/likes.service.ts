import { prisma } from "../../lib/prisma"
import { AppError } from "../../middleware/errorHandler.middleware"
import { userNotificationService } from "../notification/notification.service"

class LikeService {
  async toggle(portfolioId: number, userId: number) {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      select: { userId: true }
    })
    const existing = await prisma.like.findUnique({
      where: {
        portfolioId_userId: {
          portfolioId,
          userId
        }
      }
    })

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } })
      return { liked: false }
    } else {
      await prisma.like.create({ data: { portfolioId, userId } })
      await userNotificationService.create("like", userId, portfolio!.userId)
      return { liked: true }
    }
  }

}

export const likeService = new LikeService()