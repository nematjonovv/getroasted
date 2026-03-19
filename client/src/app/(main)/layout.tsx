"use client"
import { useMe } from "@/src/features/auth/useAuth";
import Tabs from "@/src/features/portfolio/components/Tabs";
import Navbar from "@/src/shared/components/Navbar";
import { usePathname, useRouter } from "next/navigation";
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
    <div className="flex text-(--text)">
      <div className="h-screen flex-1">
        Notification
      </div>
      <div className="relative flex-2 border-r border-l border-(--text-20) overflow-y-scroll h-screen feed-scroll">

        <div className="px-2.5 h-full relative">
          {children}
        </div>
        <Navbar />
      </div>
      <div className="h-screen flex-1">
        Who to follow
      </div>
    </div>
  )
}