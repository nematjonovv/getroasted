export interface IPortfolioResponse {
  success: boolean,
  message: string
  data: Portfolio[]
}
export type PortfolioImage = {
  id: number
  imageUrl: string
  portfolioId: number
}

type RoastUser = {
  id: number
  username: string
  avatar: string | null
}

type Roast2 = {
  id: number
  content: string
  portfolioId: number
  userId: number
  createdAt: string
  updatedAt: string
  user: RoastUser
}

type PortfolioDetail = {
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
  techstack: string[]
  user: {
    id: number
    username: string
    avatar: string | null
    profession?: string
  }
  portfolioImages: PortfolioImage[]
  roasts: Roast2[]
  likeCount: number
  isLiked: boolean
}

export type PortfolioDetailResponse = {
  success: boolean
  data: PortfolioDetail
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
  techstack: string[]
  user: {
    id: number
    username: string
    profession?: string
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

export type PortfolioDeleteResponse = {
  success: boolean,
  message: string
} 