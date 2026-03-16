import StaticCard from "@/src/shared/components/StaticCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Get Roasted | Auth",
};
export default function AuthLayout({ children }: { children: React.ReactNode }) {


  return (
    <div className="w-screen flex bg-(--surface)">
      {children}
      <div className="w-1/2 h-screen bg-(--bg) py-13 px-25">
        <div className="bg-(--surface) px-4 py-2 inline-flex rounded-full gap-3 text-(--text-50) border border-(--text-10) dmsans mb-20">
          <div className="text-(--primary) flex items-center gap-2  syne">
            <span className="inline-block h-2 w-2 bg-(--primary) rounded-full" />
            1,240
          </div>
          portfolio roasted today
        </div>
        <h1 className="text-(--text) text-5xl font-bold dmsans">
          Your work deserves <span className="text-(--primary)">real</span> feedback.
        </h1>
        <p className="text-(--text-50) text-sm mt-5">
          Not "looks great!" — actual, brutal, helpful critique from people who know their craft.
        </p>
        <div className="flex flex-col gap-5 mt-10">
          <StaticCard title={`"someone definitely ignored the design system"`} />
        <StaticCard title={`"not terrible… just questionable"`} />
        </div>
      </div>
    </div>
  )
}