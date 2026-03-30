"use client"

import { useMe } from "@/src/features/auth/useAuth";
import Sidebar from "@/src/shared/components/admin/Sidebar";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  const { data: user, isLoading, isError } = useMe()

  useEffect(() => {
    if (isLoading) return
    if (isError || !user) {
      router.push("/login")
      return
    }
    if (user.user.role === "USER") {
      router.push("/")
    }
  }, [isLoading, isError, user])
  return (
    <div className="relative bg-(--bg) h-screen max-w-screen flex overflow-hidden">
      <Sidebar />
      {children}
    </div>
  )
}