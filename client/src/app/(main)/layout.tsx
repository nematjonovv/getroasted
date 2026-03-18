"use client"
import { useMe } from "@/src/features/auth/useAuth";
import Navbar from "@/src/shared/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user, isLoading, isError } = useMe()

  useEffect(() => {
    if (isLoading) return
    if (isError || !user) {
      router.push("/login")
    }
  }, [isLoading, isError, user])

  return (
    <div className="bg-(--bg)">
      {children}
      <Navbar />

    </div>
  )
}