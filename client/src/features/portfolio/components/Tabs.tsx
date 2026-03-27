"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

function Tabs() {
  const tabs = [
    {
      href: "/foryou",
      title: "For you",
    },
    {
      href: "/following",
      title: "Following",
    }
  ]
  const pathname = usePathname();
  // 
  return (
    <div className="sticky top-0 w-full flex items-center bg-(--bg) z-9999">
      {
        tabs.map((t, i) => (
          <Link href={`/feed${t.href}`} className={`syne transition duration-100 ease-in-out flex-1 text-center py-2 m-2 rounded-xl ${pathname === `/feed${t.href}` ? "bg-(--surface)" : ""}`} key={i}>{t.title}</Link>
        ))
      }
    </div>
  );
}

export default Tabs;