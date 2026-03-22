export interface RoastAuthor {
  avatar: string | null;
  username: string;
}

export interface Roast {
  id: number;
  content: string;
  user: RoastAuthor;
}

export interface Portfolio {
  id: number;
  slug: string;
  title: string;
  description: string;
  liveLink: string | null;
  githubLink: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  roasts: Roast[];
  likeCount: number
  isLiked: boolean
}

export interface UserProfile {
  id: number
  avatar: string | null;
  name: string | null;
  secondname: string | null;
  profession: string | null;
  techstack: string[];
  username: string;
  bio: string | null;
  portfolios: Portfolio[];
  followerCount: number;
  followingCount: number;
  isFollowed: boolean;
  isLiked: boolean
  likeCount: number
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}