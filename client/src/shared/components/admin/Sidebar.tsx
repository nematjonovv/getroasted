import Menu from "@/src/features/admin/components/Menu";

function Sidebar() {
  return (
    <div className="h-full w-70 bg-(--surface) p-2">
      <div className="h-20 flex items-center gap-2">
        <img src="/logo.png" className="w-10 h-10 object-contain" alt="" />
        <p className="text-2xl text-(--text) font-bold">GET ROASTED</p>
      </div>
      <Menu />
    </div>
  );
}

export default Sidebar;