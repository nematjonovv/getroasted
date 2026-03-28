"use client"
import { useGetStats } from '../useAdmin';

function TotalPortfolios() {
  const { data } = useGetStats()
  const portfolios = data?.data.portfolios
  return (
    <div className="flex-1 bg-zinc-900 border border-zinc-800 py-3 px-7 round15">
      <p className="text-3xl text-(--text-50)">Total portfolios</p>
      <p className="text-l text-(--text-20)">All created portfolios</p>
      <p className="text-(--accent) text-6xl">
        {portfolios?.total}
      </p>
    </div>
  );
}

export default TotalPortfolios;