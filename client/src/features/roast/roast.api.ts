import apiReq from "@/src/shared/lib/axios"
import { IRoastResponse, RoastBody } from "./roast.type"

export const roastApi = {
  postRoast: ({ portfolioId, data }: { portfolioId: string, data: RoastBody }): Promise<IRoastResponse> => {
    return apiReq.post(`/api/roasts/${portfolioId}`, data)
      .then((r) => r.data)
  }
}