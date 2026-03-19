import { Portfolio } from "../portfolio/portfolio.type"

export interface ILoginDto {
  username: string
  password: string
}
export interface IRegisterDto {
  username: string
  password: string
  email: string
}
export interface IResponseDto {
  username: string,
  email: string,
  password: string
}

export interface IAuthResponse {
  success: boolean,
  message: string,
  token: string
}

// features/auth/types/index.ts

export interface IUser {
  id: number
  username: string
  email: string
  name: string | null
  secondname: string | null
  techstack: string[]
  profession: string | null
  bio: string | null
  avatar: string | null
  isBanned: boolean
  role: 'SUPERADMIN' | 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
  portfolios: PortfolioItem[]
  following: FollowingItem[]
  followers: FollowerItem[]
}


interface PortfolioItem {
  id: number
  slug: string
  title: string
  description: string
  liveLink: string
  githubLink: string
  views: number
  createdAt: string
  updatedAt: string
  userId: number
}

interface FollowUser {
  id: number
  username: string
  name: string | null
  avatar: string | null
  profession: string | null
}

interface FollowingItem {
  createdAt: string
  following: FollowUser
}

interface FollowerItem {
  createdAt: string
  follower: FollowUser
}
export interface IMeResponse {
  success: boolean
  user: IUser
}