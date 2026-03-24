interface User {
  id: number
  avatar: string | null
  username: string
  profession: string
}

export interface SearchResponse {
  success: boolean
  message: string
  data: User[]
}