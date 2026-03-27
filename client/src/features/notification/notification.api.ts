import apiReq from "@/src/shared/lib/axios";
import { NotificationResponse, UnredCountResponse } from "./notification.type";

export const notificationApi = {
  getMessages: (): Promise<NotificationResponse> => apiReq.get("/api/messages").then((m) => m.data),
  markAllRead: () => apiReq.patch("/api/messages/read").then((r) => console.log(r.data)),
  unredCount: (): Promise<UnredCountResponse> => apiReq.get("/api/messages/unread-count").then((r) => r.data),
}