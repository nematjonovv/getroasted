import { useQuery } from "@tanstack/react-query";
import { searchApi } from "./search.api";

export function useSearch(username: string) {

  return useQuery({
    queryKey: ["usersearch", username],
    queryFn: () => searchApi.username(username),
    enabled: !!username.trim()
  })
}