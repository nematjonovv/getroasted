import { User } from "lucide-react";

export default function Avatar({ name, role }: { name: string, role: string }) {
  return (
    <div className="w-9 h-9 rounded-full bg-linear-to-br from-(--primary) to-(--accent) flex items-center justify-center text-white text-sm font-bold">
      {role !== "USER" ? (
        <User />
      ) : (
        <>
          {name[0].toUpperCase()}
          {name[1].toUpperCase()}
        </>
      )}
    </div>
  )
}