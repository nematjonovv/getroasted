"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useNotification } from "@/src/shared/lib/NotificationProvider";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.getMe,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token')
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { success, error1 } = useNotification()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.token)
      queryClient.invalidateQueries({ queryKey: ["me"] })
      router.push("/feed")
    }
  })
}
export function useRegister() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.token)
      queryClient.invalidateQueries({ queryKey: ["me"] })
      router.push("/login")
    },
    onError: (err) => {
      console.log(err);
    }
  })
}

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return () => {
    localStorage.removeItem('access_token')
    queryClient.clear()  // barcha cacheni tozalaydi
    router.push('/login')
  }
}