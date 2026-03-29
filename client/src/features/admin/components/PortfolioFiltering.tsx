"use client"
import { Search } from "lucide-react";
import SortDropdown from "./SortDropdown";
import { useEffect, useState } from "react";
import { useGetPortfolios } from "../useAdmin";

type Props = {
  search: string
  sort: "oldest" | "newest"
  onSearchChange: (value: string) => void
  onSortChange: (value: "oldest" | "newest") => void
}

function PortfolioFiltering({ search, sort, onSearchChange, onSortChange }: Props) {

  return (
    <div className="w-full flex items-center gap-5">
      <label className="relative flex items-center">
        <Search size={20} className="absolute text-(--text-50) left-2" />
        <input onChange={(e) => onSearchChange(e.target.value)} value={search} type="text" className="border border-(--text-20) round15 placeholder:text-(--text-50) px-8 py-2 text-(--text-50) outline-none focus:ring-1 focus:ring-(--primary)" placeholder="Search" />
      </label>
      <SortDropdown sort={sort} onSortChange={onSortChange} />
    </div>
  );
}

export default PortfolioFiltering;