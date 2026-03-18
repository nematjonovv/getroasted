"use client"
import Tabs from "@/src/features/portfolio/components/Tabs";
import { usePathname } from "next/navigation";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showTabs = !pathname.includes('/feed/portfolio/')
  return (
    <div className="flex text-(--text)">
      <div className="h-screen flex-1">
        Notification
      </div>
      <div className="relative flex-2 border-r border-l border-(--text-20) overflow-y-scroll h-screen feed-scroll">
        {showTabs && <Tabs />}

        <div className="px-2.5 h-full relative">
          {children}
        </div>
      </div>
      <div className="h-screen flex-1">
        Who to follow
      </div>
    </div>
  )
}