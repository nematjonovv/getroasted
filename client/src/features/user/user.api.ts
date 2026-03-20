import apiReq from "@/src/shared/lib/axios";
import { UserProfileResponse } from "./user.type";

export const userApi = {
  getUser: (username: string): Promise<UserProfileResponse> => apiReq.get(`/api/users/${username}`).then((u) => u.data)
}

