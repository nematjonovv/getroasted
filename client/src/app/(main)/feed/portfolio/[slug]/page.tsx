"use client"
import Roast from '@/src/features/portfolio/components/Roast';
import { portfolioApi } from '@/src/features/portfolio/portfolio.api';
import { usePortfolioBySlug } from '@/src/features/portfolio/usePortfolio';
import { Carousel } from '@/src/shared/components/ImageCarousel';
import { queryClient } from '@/src/shared/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, ExternalLink, Eye, Flame, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
type Props = {
  params: Promise<{ slug: string }>
}
function page({ params }: Props) {
  const { slug } = use(params)
  const router = useRouter()
  const { data: dataBySug } = usePortfolioBySlug(slug)
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

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#3C3489] flex items-center justify-center text-[10px] font-medium text-[#CECBF6]">
                {initials}
              </div>

              <span className="text-sm text-(--text-50)">@{portfolio.user.username}</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">{portfolio.title}</h1>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3 text-md text-(--text-30)">
              <span className="flex items-center gap-1"><Eye size={14} /> {portfolio.views}</span>
              <span className="flex items-center gap-1"><Flame size={14} /> {portfolio.likeCount}</span>

            </div>
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

          </div>
        </div>

        {/* description */}
        <p className="text-sm text-(--text-50) leading-relaxed">{portfolio.description}</p>

        {/* divider */}
        <div className="border-t border-(--text-20)" />

        {/* roast input */}
        <Roast portfolioId={String(portfolio.id)} />

        {/* roastlar */}
        <div>
          <p className="text-xl text-(--primary) mb-4 uppercase tracking-wider">
            {portfolio.roasts.length} Roast
          </p>

          {portfolio.roasts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-2xl syne text-(--text-20)">No one has roasted yet</p>
              <p className="text-xl syne text-(--text-20) mt-1">Be the first 🔥</p>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolio.roasts.map((r) => (
                <div key={r.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#3C3489] flex items-center justify-center text-[10px] font-medium text-[#CECBF6] shrink-0 mt-0.5">
                    {r.user.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-(--text-50) font-medium">
                      <Link href={`/profile/${r.user.username}`}>
                        @{r.user.username}
                      </Link>
                    </span>
                    <p className="text-sm mt-0.5 leading-relaxed">{r.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;