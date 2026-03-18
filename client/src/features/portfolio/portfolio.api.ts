import apiReq from "@/src/shared/lib/axios";
import { IPortfolioResponse } from "./portfolio.type";

export const portfolioApi = {
  getPortfolio: (): Promise<IPortfolioResponse> => apiReq.get("/api/portfolios").then((p) => p.data),
  like: (id: number) => apiReq.post(`/api/likes/${id}`)
}

