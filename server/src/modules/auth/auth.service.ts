import { prisma } from "../../lib/prisma";
import { AppError } from "../../middleware/errorHandler.middleware";
import { CreateUserDto, loginDto } from "./auth.validation";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthService {
  private generateToken(user: { id: number; username: string, role: string }) {
    return jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
  }
  async register(userData: CreateUserDto) {
    const existingEmail = await prisma.user.findUnique({ where: { email: userData.email } })
    const existingUserName = await prisma.user.findUnique({ where: { username: userData.username } })

    if (existingEmail) {
      throw new AppError(400, "User with this email already exist")
    }
    if (existingUserName) {
      throw new AppError(400, "User with this username already exist")
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword
      }
    })

    const token = this.generateToken(newUser);

    return { token }

    // return newUser
  }

  async login(data: loginDto) {
    const username = data.username
    const password = data.password

    const isExist = await prisma.user.findUnique({ where: { username } })
    if (!isExist) {
      throw new AppError(400, "Invalid username or password")
    }

    const isMatch = await bcrypt.compare(password, isExist.password)
    if (!isMatch) {
      throw new AppError(400, "Invalid username or password")
    }
    const token = this.generateToken(isExist)

    return token
  }

  async me(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
      include: {
        portfolios: true,
        following: {
          select: {
            createdAt: true,   // qachon follow qilgani
            following: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
                profession: true,
              }
            }
          }
        },
        followers: {
          select: {
            createdAt: true,
            follower: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
                profession: true,
              }
            }
          }
        }
      }
    })

    return user
  }
}

export const authService = new AuthService()