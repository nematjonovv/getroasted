import { ProfileData } from "@/src/app/(main)/profile/update/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profilApi } from "./profile.api";
import axios from "axios";
import { IErrorFields } from "@/src/shared/types/type";
import { useRouter } from "next/navigation";

export function useUpdateProfile(data: ProfileData, onSuccess?: (message: string) => void, onError1?: (message: string) => void) {
  const useQuery = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: () => profilApi.update(data),
    onSuccess: (data) => {
      useQuery.invalidateQueries({ queryKey: ["me"] })
      onSuccess?.("Updated successfully")
      setTimeout(() => {
        router.push("/profile/me")
      }, 1500);
    },
    onError: ((err) => {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as IErrorFields;
        if (!data.errors || Object.keys(data.errors).length === 0) {
          onError1?.(data.message);

        }
      }
    })
  })
}