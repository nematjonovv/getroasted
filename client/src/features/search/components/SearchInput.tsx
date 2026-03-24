"use client"
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearch } from "../useSearch";
import { Dots } from "@/src/shared/ui/Loader";

function SearchInput() {
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")
  useEffect(() => {
    setLoading(true)

    if (inputValue === "") {
      setLoading(false)
    }
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, 300);

    return () => clearTimeout(timer)
  }, [inputValue])

  const { data: search, isLoading } = useSearch(debouncedValue)

  return (
    <div className="w-full mx-5 mt-7">
      <div className="relative flex items-center">
        <label className="absolute left-3.5 ">
          <Search size={20} className="text-(--text-50)" />
        </label>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          className="outline-none w-full round15 py-3 px-10 border-2 border-(--text-10) focus:ring-(--primary) focus:ring-2 placeholder:syne"
        />
      </div>
      {/* output */}
      <div className={`w-full min-h-100 bg-(--surface) mt-2 round15 border border-(--text-10) 
        ${loading ? "inline-block" : "hidden"}`}>
        {
          isLoading ? (
            <div className="w-full h-100 flex items-center justify-center">
              <Dots />
            </div>
          ) : (
            search?.data.length === 0 ? (
              <div className="w-full h-100 flex items-center justify-center">
                <p className="text-(--text-20) text-2xl syne">Nothing found</p>
              </div>
            ) : (
              search?.data.map((u) => (
                <p>{u.username}</p>
              ))
            )
          )
        }
      </div>
    </div>
  );
}

export default SearchInput;