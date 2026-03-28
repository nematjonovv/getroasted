"use client"

import { useGetStats } from "../useAdmin";

function TotalUsers() {
  const { data } = useGetStats()
  const users = data?.data.users
  return (
    <div className="flex-1 bg-zinc-900 border border-zinc-800 py-3 px-7 round15">
      <p className="text-3xl text-(--text-50)">Total users</p>
      <p className="text-l text-(--text-20)">All registered users</p>
      <p className="text-(--primary) text-6xl">
        {users?.total}
      </p>
    </div>
  );
}

export default TotalUsers;