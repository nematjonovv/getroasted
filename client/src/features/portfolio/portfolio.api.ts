import apiReq from "@/src/shared/lib/axios";
import { CreatePortfolioResponse, IPortfolioResponse, PortfolioDeleteResponse, PortfolioDetailResponse } from "./portfolio.type";

export const portfolioApi = {
  getPortfolio: (): Promise<IPortfolioResponse> =>
    apiReq.get("/api/portfolios")
      .then((p) => p.data),
  like:
    (id: number) =>
      apiReq.post(`/api/likes/${id}`),
  getBySlug:
    (slug: number): Promise<PortfolioDetailResponse> =>
      apiReq.get(`/api/portfolios/${slug}`)
        .then((p) => p.data),
  getFollowingPortfolio: (id: string): Promise<IPortfolioResponse> =>
    apiReq.get(`/api/portfolios/following/${id}`)
      .then((p) => p.data),
  viewPortfolio:
    (portfolioId: string) =>
      apiReq.patch(`/api/portfolios/${portfolioId}/view`).then((v) => v.data),
  deletePortfolio: (id: string): Promise<PortfolioDeleteResponse> =>
    apiReq.delete(`/api/portfolios/${id}`).then((d) => d.data),
  createPortfolio: (data: FormData): Promise<CreatePortfolioResponse> => apiReq.post("/api/portfolios", data).then((p) => p.data)
}

