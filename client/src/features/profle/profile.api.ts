import { ProfileData } from "@/src/app/(main)/profile/update/page";
import apiReq from "@/src/shared/lib/axios";

export const profilApi = {
  update: (data: ProfileData) => apiReq.put("/api/users/me", data).then((p) => p.data)
}