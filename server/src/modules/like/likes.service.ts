import { prisma } from "../../lib/prisma"
import { AppError } from "../../middleware/errorHandler.middleware"

class LikeService {
  async toggle(portfolioId: number, userId: number) {
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
      return { liked: true }
    }
  }
  
}

export const likeService = new LikeService()