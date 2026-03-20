import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";
import { uploadImage } from "../../scripts/uploadImage.script";
import { profileUpdateDto } from "./user.validation";
import bcrypt from "bcrypt"
class UserService {
  async getByUserName(username: string, currentUserId?: number) {
    const user = await prisma.user.findUnique({
      where: { username }, select: {
        avatar: true,
        name: true,
        secondname: true,
        profession: true,
        techstack: true,
        username: true,
        bio: true,
        portfolios: {
          include: {
            roasts: {
              select: {
                id: true,
                content: true,
                user: {
                  select: {
                    avatar: true,
                    username: true,
                  }
                }
              }
            }
          }
        },
        followers: {
          select: { followerId: true }
        },
        following: {
          select: {
            followingId: true
          }
        }
      }
    })
    if (!user) throw new AppError(404, "User topilmadi")

    const { followers, following, ...rest } = user
    return {
      ...rest,
      followerCount: followers.length,
      followingCount: following.length,
      isFollowed: currentUserId
        ? followers.some(f => f.followerId === currentUserId)
        : false  // current user bu userni follow qilganmi
    }

    return user
  }
  async updatedProfile(id: number, data: profileUpdateDto) {
    const { bio, name, profession, secondname, techstack, username } = data
    const user = await prisma.user.update({
      where: { id },
      data: {
        bio,
        name,
        profession,
        secondname,
        techstack,
        username
      },
      omit: { password: true }
    })
    return user
  }
  async updateAvatar(id: number, file: Express.Multer.File) {

    const avatarUrl = await uploadImage(file)

    const updated = await prisma.user.update({
      where: { id },
      data: { avatar: avatarUrl.transformed_url }
    })

    return updated
  }
  async deleteProfile(id: number) {
    const deleted = await prisma.user.delete({ where: { id } })

    return deleted
  }
  async changePassword(id: number, newPassword: string, oldPassword: string) {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new AppError(404, "User not found")

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) throw new AppError(401, "Old password is incorrect")

    const hashed = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id },
      data: { password: hashed }
    })

    return true
  }
}

export const userService = new UserService()