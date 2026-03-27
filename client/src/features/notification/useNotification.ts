import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "./notification.api";

export function useGetMessages() {
  return useQuery({
    queryKey: ["notification"],
    queryFn: () => notificationApi.getMessages(),
    staleTime: 0
  })
}
export function useMarkAllRead() {
  const querClient = useQueryClient()
  return useMutation({
    mutationKey: ["read"],
    mutationFn: () => notificationApi.markAllRead(),
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["notification"] })
      querClient.invalidateQueries({ queryKey: ["unreadcount"] })
    }
  })
}
export function useGetUnredCount() {
  return useQuery({
    queryKey: ["unreadcount"],
    queryFn: () => notificationApi.unredCount(),
    staleTime: 0
  })
}


//  staleTime: 30000,
//     refetchInterval: 30000,
//     refetchOnWindowFocus: false,