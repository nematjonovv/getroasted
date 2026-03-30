import { prisma } from "../../lib/prisma"
import { messageType } from "./notification.type"

class UserNotification {
  async create(type: messageType, fromUserId: number, toUserId: number) {
    if (fromUserId === toUserId) return null
    const fromUser = await prisma.user.findUnique({ where: { id: fromUserId }, select: { username: true } })
    const messages = {
      like: `${fromUser?.username} liked your portfolio`,
      follow: `${fromUser?.username} started following you`,
      roast: `${fromUser?.username} roasted your portfolio`,
      ban: `Your account has been banned`,
    }

    return await prisma.userNorification.create({
      data: {
        type,
        fromUserId,
        toUserId,
        message: messages[type]
      }
    })

  }

  async getMessages(userId: number) {
    return await prisma.userNorification.findMany({
      where: { toUserId: userId },
      include: {
        fromUser: {
          select: { username: true, avatar: true }
        }
      }
    })
  }
  async getUndreadCount(userId: number) {
    return prisma.userNorification.count({
      where: { toUserId: userId, isRead: false }
    })
  }

  async markAllRead(userId: number) {
    return await prisma.userNorification.updateMany({
      where: {
        toUserId: userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    })
  }
}


export const userNotificationService = new UserNotification()
