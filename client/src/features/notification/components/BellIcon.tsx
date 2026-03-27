"use client"
import { Bell } from "lucide-react";
import { useState } from "react";
import { useGetUnredCount } from "../useNotification";

function BellIcon({ onOpen, onClose }: { onOpen: () => void, onClose: () => void }) {
  const { data } = useGetUnredCount()
  const count = data?.data ?? 0
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    if (isOpen) {
      onClose()
      setIsOpen(false)
    } else {
      onOpen()
      setIsOpen(true)
    }
  }
  return (
    <button
      onClick={handleClick}
      className="relative border border-(--text) p-2.5 round15 m-5 cursor-pointer hover:border-(--text-50) hover:text-(--text-50) active:scale-95">
      <Bell />
      <span className={`absolute -top-2 -right-2.5 rounded-full bg-(--primary) py-1 px-2 text-xs border border-(--bg) ${count > 0 ? "block" : "hidden"}`}>
        {count}
      </span>
    </button>
  );
}

export default BellIcon;