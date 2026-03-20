import { useMe } from "@/src/features/auth/useAuth";
import { useGetUser } from "@/src/features/user/useUser";
import { useEffect } from "react";

export function useProfilePage(username: string) {
  const { data: me } = useMe()
  const { data: user, isLoading, isError } = useGetUser(username)

  const isOwner = me?.user.username === user?.data.username

  return { me, user, isOwner, isLoading, isError }
}