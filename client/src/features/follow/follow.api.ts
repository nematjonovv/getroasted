import apiReq from "@/src/shared/lib/axios";

export const followApi = {
  follow: (id: string) => apiReq.post(`/api/follow/${id}`),
  checkFollow: (followerId: string): Promise<checkResponse> => apiReq.get(`/api/isfollow/${followerId}`).then((f) => f.data)
}

type checkResponse = {
  success: boolean
  data: {
    isFollowed: boolean
  }
}