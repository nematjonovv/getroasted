import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";
import { userNotificationService } from "../notification/notification.service";
import { roastDto } from "./roast.validation";

class RoastService {
  async post(portfolioId: number, userId: number, content: roastDto) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioId } })
    if (!portfolio) throw new AppError(404, "Portfolio topilmadi");

    userNotificationService.create("roast", userId, portfolio.userId)

    const roast = await prisma.roast.create({
      data: {
        content: content.content,
        portfolioId,
        userId
      }
    })

    return { content: roast.content, id: roast.id }
  }

  async getAll(portfolioId: number) {
    const roasts = await prisma.roast.findMany(
      {
        where: { portfolioId },
        include: {
          user: {
            select: { id: true, username: true, avatar: true }
          }
        }
      })

    return roasts
  }
  async deleteRoast(roastId: number, userId: number) {
    const roast = await prisma.roast.findUnique({ where: { id: roastId } })
    if (!roast) throw new AppError(404, "Roast topilmadi");
    if (roast.userId !== userId) throw new AppError(403, "Ruxsat yo'q");

    return await prisma.roast.delete({ where: { id: roastId } })
  }
}


export const roastService = new RoastService()