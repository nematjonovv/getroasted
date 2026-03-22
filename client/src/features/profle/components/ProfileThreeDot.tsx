import { MoreHorizontal, LogOut, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function ProfileThreeDot({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="p-1.5 rounded-lg hover:bg-(--surface) transition duration-100 cursor-pointer"
      >
        <MoreVertical size={20} className="text-(--text-50)" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 bg-(--bg) border border-(--text-20) round15 z-50 w-36 py-1">
          <button
            onClick={() => { onLogout(); setOpen(false) }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm syne text-(--text-50) hover:bg-(--surface) transition duration-100 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}