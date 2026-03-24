"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "./portfolio.api";
import { queryClient } from "@/src/shared/lib/queryClient";
import { IPortfolioResponse, Portfolio } from "./portfolio.type";
import { useNotification } from "@/src/shared/lib/NotificationProvider";
import { IErrorFields } from "@/src/shared/types/type";
import axios from "axios";
import { useRouter } from "next/navigation";

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


export function useCreatePortfolio(username: string, onSuccess?: (message: string) => void, onError1?: (message: string) => void, onFieldErrors?: (errors: Record<string, string[]>) => void) {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: FormData) => portfolioApi.createPortfolio(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user", username] })
      onSuccess?.(data.message)
      setTimeout(() => {
        router.push("/profile/me")
      }, 1500);
    },
    onError: ((err) => {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as IErrorFields<{
          title?: string[]
          description?: string[]
          liveLink?: string[]
          githubLink?: string[]
          techstack?: string[]
        }>;
        if (data.errors && Object.keys(data.errors).length > 0) {
          onFieldErrors?.(data.errors)
        } else {
          onError1?.(data.message)
        }
      }
    })
  })
}