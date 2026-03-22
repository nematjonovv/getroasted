"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "./portfolio.api";
import { queryClient } from "@/src/shared/lib/queryClient";
import { IPortfolioResponse, Portfolio } from "./portfolio.type";
import { useNotification } from "@/src/shared/lib/NotificationProvider";

export function useGetPortfolios() {
  return useQuery({
    queryKey: ["portfolios"],
    queryFn: portfolioApi.getPortfolio,
  })
}

export function useLike(portfolioId: number, isLiked: boolean, likeCount: number) {
  return useMutation({
    mutationFn: portfolioApi.like,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me", likeCount], }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["portfolios"] })
      const previos = queryClient.getQueryData(['portfolios'])
      queryClient.setQueryData(["portfolios"], (old: IPortfolioResponse) => ({
        ...old,
        data: old.data.map((p) =>
          p.id === portfolioId
            ? { ...p, isLiked: !isLiked, likeCount: isLiked ? likeCount - 1 : likeCount + 1 }
            : p
        )
      }))
      return { previos }
    },
    onError: (err, _, context) => {
      // xato bo'lsa eski holatga qaytар
      queryClient.setQueryData(["portfolios"], context?.previos)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] })
    }
  })
}

export function usePortfolioBySlug(id: string) {
  return useQuery({
    queryKey: ["portfolioBySlug", id],
    queryFn: () => portfolioApi.getBySlug(Number(id)),
    staleTime: 0
  })
}

export function useFollowingPortfolio(id: string) {
  return useQuery({
    queryKey: ["followingPortfolio", id],
    queryFn: () => portfolioApi.getFollowingPortfolio(id),
    staleTime: 0
  })
}

export function useView(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => portfolioApi.viewPortfolio(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["usePortfolioBySlug", id] })
  })
}

export function useDeletePortfolio(id: string, username: string, onSuccess?: (message: string) => void, onError?: (message: string) => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => portfolioApi.deletePortfolio(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user", username] })
      onSuccess?.(data.message)
    },
    onError: (error: any) => {
      onError?.(error?.response?.data?.message || "Something went wrong")
    },
  })
}