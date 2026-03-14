import { Role } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";
import { changeRoleDto } from "./admin.validation";

class AdminService {
  async getUsers() {
    return await prisma.user.findMany({ omit: { password: true }, include: { portfolios: true, roasts: true, following: true, followers: true } })
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


}

export const adminService = new AdminService()