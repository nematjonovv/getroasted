import apiReq from "@/src/shared/lib/axios";
import { IAuthResponse, ILoginDto, IMeResponse, IRegisterDto, IResponseDto } from "./auth.type";

export const authApi = {
  login: (data: ILoginDto): Promise<IAuthResponse> =>
    apiReq.post("/auth/login", data).then((r) => r.data),
  register: (data: IRegisterDto): Promise<IAuthResponse> =>
    apiReq.post("/auth/register", data).then((r) => r.data),
  getMe: (): Promise<IMeResponse> => apiReq.get("/auth/me").then((r) => r.data)
}
