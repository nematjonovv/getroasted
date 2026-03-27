"use client"

import { useMe } from "../../auth/useAuth";

function AdminCard() {
  const { data: admin } = useMe()
  return (
    <div className="flex items-center gap-5">
      <p className="text-(--text) syne text-xl">{admin?.user.username}</p>
      <span className="uppercase bg-(--primary)/20 px-3 py-3 rounded-full text-(--primary)">
        {admin?.user.username.slice(0, 1)}
        {admin?.user.username.slice(1, 2)}
      </span>
    </div>
  );
}

export default AdminCard;