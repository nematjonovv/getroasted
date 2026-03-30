import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "./admin.api";
import { useNotification } from "@/src/shared/lib/NotificationProvider";

export function useGetStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => adminApi.getStats(),
    staleTime: 30000
  })
}

export function useGetPortfolios(search?: string, sort?: "oldest" | "newest") {
  return useQuery({
    queryKey: ["admin-portfolios", search, sort],
    queryFn: () => adminApi.getPortfolios(search, sort),
    staleTime: 0
  })
}

export function useDeletePortfolio(id: number) {
  const queryClient = useQueryClient()
  const { success } = useNotification()
  return useMutation({
    mutationFn: () => adminApi.deletePortfolio(id),
    onSuccess: (data) => {
      success(data.message)
      queryClient.invalidateQueries({ queryKey: ["admin-portfolios",] })
    }
  })
}

export function useGetAdminUsers({ search }: { search: string }) {
  return useQuery({
    queryKey: ["admin-users", search],
    queryFn: () => adminApi.getAdminUsers(search),
    staleTime: 0
  })
}