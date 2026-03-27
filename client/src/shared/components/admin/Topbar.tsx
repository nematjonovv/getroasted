import AdminCard from "@/src/features/admin/components/AdminCard";

function Topbar({ pageTitle }: { pageTitle: string }) {
  return (
    <div className="h-20 w-full bg-(--surface) px-5 flex items-center justify-between">
      <p className="text-(--text) text-4xl syne">{pageTitle}</p>
      <AdminCard />
    </div>
  );
}

export default Topbar;