import Sidebar from "@/src/shared/components/admin/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Roasted | Admin Panel",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
};
export default function AdminLayout({ children }: { children: React.ReactNode }) {



  return (
    <div className="relative bg-(--bg) h-screen max-w-screen flex">
      <Sidebar />
      {children}
    </div>
  )
}