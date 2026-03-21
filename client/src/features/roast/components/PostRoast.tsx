"use client"
import { useState } from "react";
import { usePostRoast } from "../useRoast";

function PostRoast({ portfolioId }: { portfolioId: string }) {
  const [roastText, setRoastText] = useState("")
  const [focused, setFocused] = useState(false)

  const data = {
    content: roastText
  }
  const { mutate: post } = usePostRoast({ portfolioId, data })

  const handelRoast = () => {
    post()
    setRoastText("")
    setFocused(false)
  }
  return (
    <div
      className="border border-(--text-20) rounded-xl p-3 transition-all"
      style={{ borderColor: focused ? "#D85A30" : undefined }}
    >
      <textarea
        value={roastText}
        onChange={(e) => setRoastText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Roast this portfolio"
        rows={3}
        className="w-full text-sm bg-transparent outline-none resize-none placeholder:text-(--text-50) placeholder:font-semibold syne"
      />

      <div className="flex justify-end mt-2">
        <button
          className={`text-md px-4 py-1.5 rounded-lg text-white  $transition-all hover:opacity-90 disabled:opacity-40 ${!roastText.trim() ? "cursor-not-allowed" : "cursor-pointer"}`}
          style={{ background: "#D85A30" }}
          disabled={!roastText.trim()}
          onClick={() => handelRoast()}
        >
          Roast
        </button>
      </div>
    </div>
  );
}

export default PostRoast;