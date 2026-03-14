import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";

class FollowService {
  async toggleFollow(followerId: number, followingId: number) {
    if (followerId === followingId) throw new AppError(400, "O'zingizga follow qila olmaysiz");

    const existing = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } }
    })

    if (existing) {
      await prisma.follow.delete({ where: { id: existing.id } })
      return { followed: false }
    } else {
      await prisma.follow.create({ data: { followerId, followingId } })
      return { followed: true }
    }


  }
}

export const followService = new FollowService()