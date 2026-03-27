"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const titles = ["Overview", "Portfolios", "Users", "Roasts"];

function Menu() {
  const menu = titles.map((title) => ({
    title,
    href: `/admin/${title.toLowerCase()}`,
  }));
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-2 z-50">
      {
        menu.map((m, i) => {
          const active =
            pathname === m.href;

          return (
            <Link
              className={`text-xl text-(--text-50) py-2 px-4 rounded-xl ${active ? "bg-(--card) text-white" : "hover:bg-(--card)"}`}
              href={m.href}
              key={i}
            >
              {m.title}
            </Link>
          )

        })
      }
    </nav>
  );
}

export default Menu;