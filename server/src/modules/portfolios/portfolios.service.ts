import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";
import { uploadImage } from "../../scripts/uploadImage.script";
import { createPortfolioDto, updatePortfolioDto } from "./portfolios.validation";

class PortfolioService {
  async getAll(userId: number) {
    const all = await prisma.portfolio.findMany({
      include: {
        user: {
          select: { id: true, username: true, profession: true, avatar: true }
        },
        roasts: {
          include: {
            user: { select: { id: true, username: true, avatar: true } }
          }
        },
        likes: true
      }
    })

    return all.map(p => {
      const { likes, ...rest } = p
      return {
        ...rest,
        likeCount: likes.length,
        isLiked: userId ? likes.some(l => l.userId === userId) : false
      }
    })
  }
  async getById(id: number, userId: number) {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        },
        portfolioImages: true,  // 👈 rasmlar ham kerak
        roasts: {
          include: {
            user: {
              select: { id: true, username: true, avatar: true }  // kim roast qilgan
            }
          }
        },
        likes: true
      }
    })

    if (!portfolio) throw new AppError(404, "Portfolio topilmadi")

    const { likes, ...rest } = portfolio
    return {
      ...rest,
      likeCount: likes.length,
      isLiked: userId ? likes.some(l => l.userId === userId) : false
    }
  }
  async create(data: createPortfolioDto, files: Express.Multer.File[], userId: number) {

    const imageUrls = files ? await Promise.all(
      files.map(async (file) => {
        const result = await uploadImage(file)
        return result.transformed_url
      })
    ) : []

    const portfolio = await prisma.portfolio.create({
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        description: data.description,
        liveLink: data.liveLink,
        githubLink: data.githubLink,
        techstack: data.techstack,
        userId,
        portfolioImages: {
          create: imageUrls.map((url) => ({ imageUrl: url }))
        }
      },
      include: {
        portfolioImages: true
      }
    })
    return portfolio
  }
  async getByUsername(username: string) {
    const portfolio = await prisma.portfolio.findMany({
      where: { user: { username } },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        },
        portfolioImages: true,
        roasts: {
          include: {
            user: {
              select: { id: true, username: true, avatar: true }  // kim roast qilgan
            }
          }
        }
      }
    })

    if (!portfolio) {
      throw new AppError(404, "User not found")
    }

    return portfolio
  }
  async update(id: number, userId: number, data: updatePortfolioDto) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } })
    if (!portfolio) throw new AppError(404, "Portfolio topilmadi")

    if (portfolio.userId !== userId) throw new AppError(403, "Ruxsat yo'q")

    const updated = await prisma.portfolio.update({
      where: { id }, data: {
        title: data.title,
        liveLink: data.liveLink,
        description: data.description
      }
    })

    return updated
  }
  async delete(id: number, userId: number) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } })
    if (!portfolio) throw new AppError(404, "Portfolio topilmadi")

    if (portfolio.userId !== userId) throw new AppError(403, "Ruxsat yo'q")

    const deleted = await prisma.portfolio.delete({ where: { id } })
    return deleted
  }

  async getFollowingPortfolio(id: number) {
    if (!id) {
      throw new AppError(400, "Invalid Id");
    }
    const portfolios = await prisma.portfolio.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: id
            }
          }
        }
      },
      include: {
        user: {
          select: { id: true, username: true, profession: true, avatar: true }
        },
        roasts: {
          include: {
            user: { select: { id: true, username: true, avatar: true } }
          }
        },
        likes: true
      }
    })

    return portfolios.map(p => {
      const { likes, ...rest } = p
      return {
        ...rest,
        likeCount: likes.length,
        isLiked: id ? likes.some(l => l.userId === id) : false
      }
    })
  }
}

export const portfolioService = new PortfolioService()