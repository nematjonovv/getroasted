
export interface IRoastResponse {
  message: string,
  success: boolean,
  data: RoastBody
}

export interface RoastBody {
  id?: number,
  content: string,
}