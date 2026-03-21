"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PortfolioImage } from "@/src/features/portfolio/portfolio.type"

export function Carousel({ images }: { images: PortfolioImage[] }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => i === 0 ? images.length - 1 : i - 1)
  const next = () => setCurrent(i => i === images.length - 1 ? 0 : i + 1)

  return (
    <div className="relative w-full overflow-hidden rounded-lg ">
      <img
        src={images[current]?.imageUrl}
        alt=""
        className="w-full object-cover h-70"
      />

      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full cursor-pointer">
        <ChevronLeft />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full cursor-pointer">
        <ChevronRight />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i === current ? "bg-white w-3" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}