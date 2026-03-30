import apiReq from "@/src/shared/lib/axios";
import { BanUserResponse, changeRoleResponse, IDeleteUserResponse, IPortfoliosResponse, IStatsResponse, UserResponse } from "./admin.type";


export const adminApi = {
  getStats: (): Promise<IStatsResponse> =>
    apiReq
      .get("/admin/stats")
      .then((s) => s.data),
  getPortfolios: (search?: string, sort?: "newest" | "oldest"): Promise<IPortfoliosResponse> =>
    apiReq
      .get(`/admin/portfolios`, { params: { search, sort } }).
      then((p) => p.data),
  deletePortfolio: (id: number): Promise<IDeleteUserResponse> =>
    apiReq.delete(`/admin/portfolios/${id}`)
      .then((p) => p.data),
  getAdminUsers: (search: string): Promise<UserResponse> =>
    apiReq.get(`/admin/users?username=${search}`,)
      .then((p) => p.data),
  banUser: (id: number): Promise<BanUserResponse> =>
    apiReq.put(`/admin/users/${id}/ban`)
      .then((b) => b.data),
  changeRole: (id: number, role: string): Promise<changeRoleResponse> =>
    apiReq.put(`/admin/users/${id}/ban`, role)
      .then((c) => c.data),
}