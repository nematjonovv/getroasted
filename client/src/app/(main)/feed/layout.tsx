import Tabs from "@/src/features/portfolio/components/Tabs";
import Navbar from "@/src/shared/components/Navbar";


export default function HomeLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex text-(--text)">
      <div className="h-screen flex-1">
        Notification
      </div>
      <div className="relative flex-2 border-r border-l border-(--text-20) overflow-y-scroll h-screen feed-scroll">
        <Tabs />
        <div className="px-2.5 h-full">
          {children}
        </div>
      </div>
      <div className="h-screen flex-1">
        Who to follow
      </div>
    </div>
  )
}