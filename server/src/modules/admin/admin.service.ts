import { Role } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";
import { changeRoleDto } from "./admin.validation";

class AdminService {
  async getUsers(username: string) {
    const users = await prisma.user.findMany({
      where: {
        role: "USER",
        OR: [
          { username: { contains: username, mode: "insensitive" } }
        ]
      },
      omit: {
        password: true,
      },
      include: {
        portfolios: true,
        roasts: true,
        following: true,
        followers: true
      }
    })

    return users.map(({ followers, following, roasts, portfolios, ...rest }) => ({
      ...rest,
      portfolioCount: portfolios.length,
      roastCount: roasts.length,
      followerCount: followers.length,
      followingCount: following.length,
    }))
  }
  async getAdmins(username: string) {
    const users = await prisma.user.findMany({
      where: {
        role: { in: ["ADMIN", "SUPERADMIN"] },
        OR: [
          { username: { contains: username, mode: "insensitive" } }
        ]
      },
      omit: {
        password: true,
      },
      include: {
        portfolios: true,
        roasts: true,
        following: true,
        followers: true
      }
    })

    return users.map(({ followers, following, roasts, portfolios, ...rest }) => ({
      ...rest,
      portfolioCount: portfolios.length,
      roastCount: roasts.length,
      followerCount: followers.length,
      followingCount: following.length,
    }))
  }

  async removeUser(id: number) {
    if (!id) {
      throw new AppError(400, "Id required")
    };

    const deleted = await prisma.user.delete({ where: { id } })

    return deleted
  }
  async banUser(id: number) {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) throw new AppError(404, "User not found");

    return await prisma.user.update({
      where: { id },
      data: { isBanned: !user.isBanned }
    })
  }
  async changeRole(id: number, role: changeRoleDto["role"]) {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new AppError(404, "User not found");
    return await prisma.user.update({
      where: { id },
      data: {
        role: role as Role
      }
    })
  }
  async getPortfolios(title?: string, sort?: "newest" | "oldest") {
    return await prisma.portfolio.findMany({
      where: {
        ...(title && {
          title: { contains: title, mode: 'insensitive' }
        }),
      },
      orderBy: {
        createdAt: sort === "oldest" ? "asc" : "desc"
      },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        },
        portfolioImages: true,
        likes: true,
        roasts: true
      }
    })
  }
  async removePortfolio(id: number) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } })
    if (!portfolio) throw new AppError(404, "Portfolio topilmadi")
    return await prisma.portfolio.delete({ where: { id } })
  }
  async getRoasts() {
    return await prisma.roast.findMany({
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        },
        portfolio: true
      }
    })
  }
  async removeRoast(id: number) {
    const roast = await prisma.roast.findUnique({ where: { id } })
    if (!roast) throw new AppError(404, "Roast topilmadi")
    return await prisma.roast.delete({ where: { id } })
  }
  async getStats() {
    const [totalUsers, admins, superadmins, users, totalPortfolios, totalRoasts] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { role: "SUPERADMIN" } }),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.portfolio.count(),
      prisma.roast.count()
    ])

    return {
      users: {
        total: totalUsers,
        byRole: {
          USER: users,
          ADMIN: admins,
          SUPERADMIN: superadmins
        }
      },
      portfolios: {
        total: totalPortfolios
      },
      roasts: {
        total: totalRoasts
      }
    }
  }

}

export const adminService = new AdminService()
