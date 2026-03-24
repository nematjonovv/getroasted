"use client"
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearch } from "../useSearch";
import { Dots } from "@/src/shared/ui/Loader";
import { useRouter } from "next/navigation";

function SearchInput() {
  const router = useRouter()
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

  const goToProfile = (username: string) => {
    router.push(`/profile/${username}`)
    setInputValue("")
  }
  const { data: search, isLoading } = useSearch(debouncedValue)

  return (
    <div className="w-full mx-5 mt-7">
      <div className="relative flex items-center">
        <label className="absolute left-3.5 ">
          <Search size={20} className="text-(--text-50)" />
        </label>
        <input
          type="text"
          value={inputValue}
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
              search?.data.map((u, i) => (
                <div key={u.id} onClick={() => goToProfile(u.username)} className={`bg-(--card)  ${i === 0 ? "rounded-t-[15px]" : ""} px-3 py-2 hover:bg-(--card)/90 cursor-pointer flex justify-between items-center`}>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-(--primary)/20">
                      {
                        u.avatar ?
                          <img className="object-contain rounded-full w-full h-full" src={u.avatar} alt="" /> :
                          <p className="capitalize text-(--primary) flex items-center justify-center h-full text-sm">{u.username.slice(0, 1)} {u.username.slice(1, 2)}</p>
                      }
                    </div>
                    <p className="text-(--text-50)">
                      @{u.username}
                    </p>
                  </div>
                  {
                    u.profession ? <p className="text-xs text-(--text) syne rounded-full py-1 px-1.5 bg-(--primary)/20 border border-(--primary)">
                      {u.profession}
                    </p> : ""
                  }
                </div>
              ))
            )
          )
        }
      </div>
    </div>
  );
}

export default SearchInput;