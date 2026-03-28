"use client"
import { Users, Shield, Crown } from "lucide-react";
import { useGetStats } from "../useAdmin";


function RoleDistribution() {
  const { data } = useGetStats()
  const total = data?.data.users.total ?? 0
  const users = data?.data.users
  const roles = [
    {
      key: "USER",
      label: "User",
      icon: Users,
      count: users?.byRole.USER ?? 0,
      color: "bg-violet-500",
      textColor: "text-violet-400",
      trackColor: "bg-violet-500/20",
    },
    {
      key: "ADMIN",
      label: "Admin",
      icon: Shield,
      count: users?.byRole.ADMIN ?? 0,
      color: "bg-amber-400",
      textColor: "text-amber-400",
      trackColor: "bg-amber-400/20",
    },
    {
      key: "SUPERADMIN",
      label: "Superadmin",
      icon: Crown,
      count: users?.byRole.SUPERADMIN ?? 0,
      color: "bg-emerald-400",
      textColor: "text-emerald-400",
      trackColor: "bg-emerald-400/20",
    },
  ];


  return (
    <div className="bg-zinc-900 border border-zinc-800 round15 p-6 flex-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl syne text-white">Role distribution</h3>
        <span className="text-sm font-mono text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2 py-1 rounded-full">
          {roles.length} Role
        </span>
      </div>

      <div className="space-y-4">
        {roles.map(({ key, label, icon: Icon, count, color, textColor, trackColor }) => {
          const percent = Math.round((count / total) * 100);

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${textColor}`} />
                  <span className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-mono ${textColor}`}>{percent}%</span>
                  <span className="text-sm font-semibold text-white font-mono">{count}</span>
                </div>
              </div>

              <div className={`h-1.5 w-full rounded-full ${trackColor}`}>
                <div
                  className={`h-1.5 rounded-full ${color} transition-all duration-700`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default RoleDistribution;