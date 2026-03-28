import { useQuery } from "@tanstack/react-query";
import { adminApi } from "./admin.api";

export function useGetStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => adminApi.getStats(),
    staleTime: 30000
  })
}