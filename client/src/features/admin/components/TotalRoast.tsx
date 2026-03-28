"use client"
import { useGetStats } from '../useAdmin';

function TotalRoasts() {
  const { data } = useGetStats()
  const roasts = data?.data.roasts
  return (
    <div className="flex-1 bg-zinc-900 border border-zinc-800 py-3 px-7 round15">
      <p className="text-3xl text-(--text-50)">Total roasts</p>
      <p className="text-l text-(--text-20)">All feedbacks</p>
      <p className="text-(--spark) text-6xl">
        {roasts?.total}
      </p>
    </div>
  );
}

export default TotalRoasts;