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

export function UseBan(id: number) {
  const queryClient = useQueryClient()
  const { success } = useNotification()
  return useMutation({
    mutationFn: () => adminApi.banUser(id),
    mutationKey: ["banuser"],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
      success(data.message)
    }
  })
}
export function useChangeRole(id: number, role: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => adminApi.changeRole(id, role),
    mutationKey: ["changerole"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    }
  })
}