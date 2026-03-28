import apiReq from "@/src/shared/lib/axios";
import { IStatsResponse } from "./admin.type";


export const adminApi = {
  getStats: (): Promise<IStatsResponse> => apiReq.get("/admin/stats").then((s) => s.data)
}