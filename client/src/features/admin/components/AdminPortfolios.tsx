"use client"

import { useEffect, useState } from "react";
import { useGetPortfolios } from "../useAdmin";
import PortfolioCard from "./PortfolioCard";
import PortfolioFiltering from "./PortfolioFiltering";

function AdminPortfolios() {

  const [sort, setSort] = useState<"oldest" | "newest">("newest")
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [debouncedSort, setDebouncedSort] = useState<"oldest" | "newest">("newest")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSort(sort)
    }, 500)
    return () => clearTimeout(timer)
  }, [sort])

  const { data } = useGetPortfolios(debouncedSearch, debouncedSort)
  const portfolios = data?.data ?? []

  return (

    <div className="w-full h-full overflow-y-scroll feed-scroll py-5 px-8">
      <PortfolioFiltering
        search={search}
        sort={sort}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
        {
          portfolios?.map((p) => (
            <PortfolioCard key={p.id} portfolio={p} />
          ))
        }
      </div>

    </div>


  );
}

export default AdminPortfolios;