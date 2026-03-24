import apiReq from "@/src/shared/lib/axios";
import { SearchResponse } from "./search.type";

export const searchApi = {
  username: (username: string): Promise<SearchResponse> => apiReq.get(`/api/search?username=${username}`).then((u) => u.data)
}


