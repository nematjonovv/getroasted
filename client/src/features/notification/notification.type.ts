interface FromUser {
  username: string
  avatar: string | null
}

interface Notification {
  id: number
  type: "like" | "follow" | "roast" | "ban"
  message: string
  isRead: boolean
  toUserId: number
  fromUserId: number
  fromUser: FromUser
  createdAt: string
}

export interface NotificationResponse {
  success: boolean
  data: Notification[]
}
export interface UnredCountResponse {
  success: boolean,
  data: number
}