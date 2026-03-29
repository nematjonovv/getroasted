import apiReq from "@/src/shared/lib/axios";
import { IPortfoliosResponse, IStatsResponse } from "./admin.type";


export const adminApi = {
  getStats: (): Promise<IStatsResponse> =>
    apiReq
      .get("/admin/stats")
      .then((s) => s.data),
  getPortfolios: (search?: string, sort?: "newest" | "oldest"): Promise<IPortfoliosResponse> =>
    apiReq
      .get(`/admin/portfolios`, { params: { search, sort } }).
      then((p) => p.data),

}