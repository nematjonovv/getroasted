"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, PlusSquare, Search, User } from "lucide-react";

const navItems = [
  { icon: Home, href: "/feed" },
  { icon: PlusSquare, href: "/create" },
  { icon: Search, href: "/search" },
  { icon: User, href: "/profile" },
];
function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-(--surface)/50 py-4 px-7.5 rounded-[20px] flex gap-15 border-(--text-10) border text-white backdrop-blur-xs">
      {navItems.map(({ icon: Icon, href }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Icon
            key={href}
            size={30}
            onClick={() => router.push(href)}
            className={`cursor-pointer transition duration-150 ${isActive ? "text-(--primary)" : "hover:text-(--primary)"
              }`}
          />
        );
      })}
    </div>
  );
}

export default Navbar;