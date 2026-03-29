import { useQuery } from "@tanstack/react-query";
import { adminApi } from "./admin.api";

export function useGetStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => adminApi.getStats(),
    staleTime: 30000
  })
}

export function useGetPortfolios(search?: string, sort?: "oldest" | "newest") {
  return useQuery({
    queryKey: ["admin-portfolios",search, sort],
    queryFn: () => adminApi.getPortfolios(search, sort),
    staleTime: 0
  })
}