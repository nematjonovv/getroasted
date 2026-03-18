export interface IPortfolioResponse {
  success: boolean,
  message: string
  data: Portfolio[]
}

export type Portfolio = {
  id: number
  title: string
  slug: string
  description: string
  liveLink: string
  views: number
  createdAt: string
  updatedAt: string
  userId: number
  user: {
    id: number
    username: string
  }
  roasts: Roast[]
  likeCount: number
  isLiked: boolean
}

type Roast = {
  id: number
  content: string
  portfolioId: number
  userId: number
  createdAt: string
  updatedAt: string
  user: {
    id: number
    username: string
    avatar: string | null
  }
}