import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoastBody } from "./roast.type";
import { roastApi } from "./roast.api";
import { useNotification } from "@/src/shared/lib/NotificationProvider";
import { usePortfolioBySlug } from "../portfolio/usePortfolio";

export function usePostRoast({ portfolioId, data }: { portfolioId: string, data: RoastBody }) {
  const { success } = useNotification()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => roastApi.postRoast({ portfolioId, data }),
    onSuccess: (data) => {
      success(data.message)
      queryClient.invalidateQueries({ queryKey: ["portfolioBySlug", portfolioId] })
    }
  })
}