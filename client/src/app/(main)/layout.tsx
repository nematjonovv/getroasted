"use client"
import { useMe } from "@/src/features/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user, isLoading, isError } = useMe()
  useEffect(() => {
    router.push("/")
    if (!isLoading && isError) {
      router.push("/login")
    }
  }, [isLoading, isError])

  return (
    <>
      {children}
    </>
  )
}