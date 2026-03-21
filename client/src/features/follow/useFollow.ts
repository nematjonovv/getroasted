import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followApi } from "./follow.api";

export function useFollow({ id, username }: { id: string, username: string }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => followApi.follow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", username] })
      queryClient.invalidateQueries({ queryKey: ["isFollowing", id] })
    }
  })
}

export function useCheckFollow(followerId: string) {
  return useQuery({
    queryKey: ["isFollowing", followerId],
    queryFn: () => followApi.checkFollow(followerId),
    staleTime: 0
  })
}