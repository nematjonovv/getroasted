import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";
import { userNotificationService } from "../notification/notification.service";

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
      await userNotificationService.create("follow", followerId, followingId)
      console.log("follow ishladi");

      await prisma.follow.create({ data: { followerId, followingId } })
      return { followed: true }
    }
  }
  async checkFollow(followingId: number, followerId: number) {
    const follow = await prisma.follow.findFirst({
      where: { followerId, followingId }
    })
    return !!follow
  }
}

export const followService = new FollowService()
