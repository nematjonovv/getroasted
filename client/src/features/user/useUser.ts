import { useQuery } from "@tanstack/react-query";
import { userApi } from "./user.api";

export function useGetUser(username: string) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => userApi.getUser(username),
    staleTime: 0
  })
}
