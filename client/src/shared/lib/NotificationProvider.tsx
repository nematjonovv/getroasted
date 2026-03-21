"use client";

import { CircleX, Check, AlertTriangle, Info, LucideIcon } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";


type NotifType = "success" | "error1" | "warning" | "info";

interface Notification {
  id: string;
  type: NotifType;
  message: string;
  duration?: number;
}

interface NotifContextValue {
  notify: (type: NotifType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error1: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}


const NotifContext = createContext<NotifContextValue | null>(null);

export function useNotification() {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error("useNotification must be used within <NotificationProvider>");
  return ctx;
}


const CONFIG: Record<
  NotifType,
  { icon: LucideIcon; text: string, ring: string }
> = {
  success: {
    icon: Check,
    // bar: "bg-emerald-500",
    ring: "ring-(--text-50) dark:ring-(--text-50)",
    text: "text-(--text-50) dark:text-(--text-50)",
  },
  error1: {
    icon: CircleX,
    // bar: "bg-rose-500",
    ring: "ring-red-500 dark:ring-red-800",
    text: "text-red-700 dark:text-red-300",
  },
  warning: {
    icon: AlertTriangle,
    // bar: "bg-amber-400",
    ring: "ring-amber-200 dark:ring-amber-800",
    text: "text-amber-700 dark:text-amber-300",
  },
  info: {
    icon: Info,
    // bar: "bg-sky-500",
    ring: "ring-sky-200 dark:ring-sky-800",
    text: "text-sky-700 dark:text-sky-300",
  },
};




function NotifItem({
  notif,
  onRemove,
}: {
  notif: Notification;
  onRemove: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const duration = notif.duration ?? 3500;
  const cfg = CONFIG[notif.type];
  const Icon = cfg.icon;
  // mount → visible
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // auto-dismiss
  useEffect(() => {
    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => onRemove(notif.id), 350);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, notif.id, onRemove]);

  return (
    <div
      className={[
        "relative flex items-center gap-3 overflow-hidden",
        "rounded-xl px-4 py-3 shadow-lg",
        "bg-white dark:bg-zinc-900",
        "ring-1",
        cfg.text,
        "transition-all duration-350 ease-[cubic-bezier(.34,1.56,.64,1)]",
        visible && !leaving
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-3 scale-95",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ minWidth: 260, maxWidth: 360 }}
    >


      {/* Icon badge */}
      <span
        className={[
          "flex h-6 w-6 shrink-0 items-center justify-center",
          "rounded-full",
          cfg.text,
          "text-white",
        ].join(" ")}
      >
        <Icon size={14} strokeWidth={2.5} />
      </span>

      {/* Message */}
      <span className="flex-1 text-sm font-medium text-zinc-800 dark:text-(--text-50) leading-snug">
        {notif.message}
      </span>


      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}


export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Notification[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (type: NotifType, message: string, duration?: number) => {
      const id = Math.random().toString(36).slice(2);
      setItems((prev) => [...prev, { id, type, message, duration }]);
    },
    []
  );

  const value: NotifContextValue = {
    notify,
    success: (msg, dur) => notify("success", msg, dur),
    error1: (msg, dur) => notify("error1", msg, dur),
    warning: (msg, dur) => notify("warning", msg, dur),
    info: (msg, dur) => notify("info", msg, dur),
  };

  return (
    <NotifContext.Provider value={value}>
      {children}

      {/* Portal — top center */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-9999 flex flex-col items-center gap-2 px-4">
        {items.map((n) => (
          <NotifItem key={n.id} notif={n} onRemove={remove} />
        ))}
      </div>
    </NotifContext.Provider>
  );
}


export default function NotificationDemo() {
  const { success, error1, warning, info } = useNotification();

  const demos: { label: string; fn: () => void; color: string }[] = [
    { label: "Success", fn: () => success("Fayl muvaffaqiyatli saqlandi!"), color: "bg-emerald-500 hover:bg-emerald-600" },
    { label: "Error", fn: () => error1("Xatolik yuz berdi. Qaytadan urinib ko'ring."), color: "bg-rose-500 hover:bg-rose-600" },
    { label: "Warning", fn: () => warning("Sessiya muddati tugayapti."), color: "bg-amber-400 hover:bg-amber-500" },
    { label: "Info", fn: () => info("Yangi versiya mavjud."), color: "bg-sky-500 hover:bg-sky-600" },
  ];

  return (
    <div className="flex flex-wrap gap-3 p-8">
      {demos.map(({ label, fn, color }) => (
        <button
          key={label}
          onClick={fn}
          className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${color}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}