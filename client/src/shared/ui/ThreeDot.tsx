import { MoreHorizontal, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ThreeDot({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(prev => !prev) }}
        className="p-1.5 rounded-lg hover:bg-(--surface) transition duration-100 cursor-pointer"
      >
        <MoreVertical size={20} className="text-(--text-50)" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 bg-(--bg) border border-(--text-20) round15 shadow-sm z-50 w-36 ">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); setOpen(false) }}
            className="w-full flex items-center gap-2 px-3 py-3 h-full text-sm syne text-red-400 hover:bg-(--surface) transition duration-100 cursor-pointer round15"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}