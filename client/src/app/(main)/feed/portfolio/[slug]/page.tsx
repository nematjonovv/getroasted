"use client"
import { usePortfolioBySlug } from '@/src/features/portfolio/usePortfolio';
import { Carousel } from '@/src/shared/components/ImageCarousel';
import { ChevronLeft, ExternalLink, Eye, Flame, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
type Props = {
  params: Promise<{ slug: string }>
}
function page({ params }: Props) {
  const { slug } = use(params)
  const router = useRouter()
  const { data: dataBySug } = usePortfolioBySlug(slug)
  const [roastText, setRoastText] = useState("")
  const [focused, setFocused] = useState(false)
  const portfolio = dataBySug?.data
  if (!portfolio) return null
  const initials = portfolio.user.username.slice(0, 2).toUpperCase()
  return (
    <div className="min-h-full pb-16">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-1 py-4 text-sm text-(--text-50) hover:text-(--primary) transition-colors"
      >
        <ChevronLeft size={16} /> Go back
      </button>

      <Carousel images={portfolio.portfolioImages} />

      <div className="mt-4 space-y-4">

        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold mb-2">{portfolio.title}</h1>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#3C3489] flex items-center justify-center text-[10px] font-medium text-[#CECBF6]">
                {initials}
              </div>
              <span className="text-sm text-(--text-50)">@{portfolio.user.username}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              {portfolio.githubLink && (
                <a href={portfolio.githubLink} target="_blank"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-(--text-20) text-(--text-50) hover:text-(--text-primary) hover:border-(--text-50) transition-all">
                  <Github size={13} /> GitHub
                </a>
              )}
              {portfolio.liveLink && (
                <a href={portfolio.liveLink} target="_blank"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                  style={{ background: "#D85A30" }}>
                  <ExternalLink size={13} /> Live
                </a>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-(--text-30)">
              <span className="flex items-center gap-1"><Eye size={12} /> {portfolio.views}</span>
              <span className="flex items-center gap-1"><Flame size={12} /> {portfolio.roasts.length} roast</span>
            </div>
          </div>
        </div>

        {/* description */}
        <p className="text-sm text-(--text-50) leading-relaxed">{portfolio.description}</p>

        {/* divider */}
        <div className="border-t border-(--text-20)" />

        {/* roastlar */}
        <div>
          <p className="text-xs text-(--text-30) mb-4 uppercase tracking-wider">
            {portfolio.roasts.length} Roast
          </p>

          {portfolio.roasts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-(--text-30)">Hali hech kim roast qilmagan</p>
              <p className="text-xs text-(--text-30) mt-1">Birinchi bo'l 🔥</p>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolio.roasts.map((r) => (
                <div key={r.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#3C3489] flex items-center justify-center text-[10px] font-medium text-[#CECBF6] shrink-0 mt-0.5">
                    {r.user.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-(--text-50) font-medium">@{r.user.username}</span>
                    <p className="text-sm mt-0.5 leading-relaxed">{r.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* roast input */}
        <div
          className="border border-(--text-20) rounded-xl p-3 transition-all"
          style={{ borderColor: focused ? "#D85A30" : undefined }}
        >
          <textarea
            value={roastText}
            onChange={(e) => setRoastText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Roastingni yoz..."
            rows={3}
            className="w-full text-sm bg-transparent outline-none resize-none placeholder:text-(--text-30)"
          />
          {focused && (
            <div className="flex justify-end mt-2">
              <button
                className="text-xs px-4 py-1.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "#D85A30" }}
                disabled={!roastText.trim()}
              >
                Roast qil 🔥
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default page;