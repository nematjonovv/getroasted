"use client"
import { useMe } from "@/src/features/auth/useAuth";
import { redirect } from "next/navigation";

function MePage() {
  const { data } = useMe()

  redirect(`/profile/${data?.user.username}`);
}
export default MePage