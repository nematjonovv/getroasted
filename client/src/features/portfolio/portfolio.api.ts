import apiReq from "@/src/shared/lib/axios";
import { IPortfolioResponse, PortfolioDetailResponse } from "./portfolio.type";

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
      apiReq.patch(`/api/portfolios/${portfolioId}/view`).then((v) => v.data)
}

