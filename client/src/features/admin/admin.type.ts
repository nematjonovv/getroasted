export interface IStatsResponse {
  success: boolean;
  message: string;
  data: {
    users: {
      total: number;
      byRole: Record<UserRole, number>;
    };
    portfolios: {
      total: number;
    };
    roasts: {
      total: number;
    };
  };
}

export type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

// Portfolios
export interface IPortfoliosResponse {
  success: boolean;
  message: string;
  data: IPortfolio[];
}

export interface IPortfoliosResponse {
  success: boolean;
  message: string;
  data: IPortfolio[];
}
export interface IPortfolio {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  liveLink: string;
  githubLink: string;
  techstack: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  views: number;

  user: IUser;
  portfolioImages: IPortfolioImage[];
  likes: ILike[];
  roasts: IRoast[];
}

export interface IUser {
  id: number;
  username: string;
  avatar: string;
}

export interface IPortfolioImage {
  id: number;
  imageUrl: string;
  portfolioId: number;
}

export interface ILike {
  id: number;
  portfolioId: number;
  userId: number;
  createdAt: string;
}

export interface IRoast {
  id: number;
  content: string;
  portfolioId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

/*delete */
export interface IDeleteUserResponse {
  success: boolean
  message: string
  data: {
    id: number
    username: string
    email: string
    role: UserRole
    createdAt: string
  }
}


// Users
interface User {
  id: number
  username: string
  email: string
  name: string
  secondname: string
  techstack: string[]
  profession: string
  bio: string
  avatar: string | null
  isBanned: boolean
  role: UserRole
  createdAt: string
  updatedAt: string
  portfolioCount: number
  roastCount: number
  followerCount: number
  followingCount: number
}

export interface UserResponse {
  message: string
  success: boolean
  data: User[]
}


// BAN USER
export interface BanUserResponse {
  success: boolean
  message: string
  data: {
    id: number
    username: string
    isBanned: boolean
  }
}
export interface changeRoleResponse {
  success: boolean
  message: string
}