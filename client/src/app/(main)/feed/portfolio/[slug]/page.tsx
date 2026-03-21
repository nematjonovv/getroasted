"use client"
import { usePortfolioBySlug, useView } from '@/src/features/portfolio/usePortfolio';
import PostRoast from '@/src/features/roast/components/PostRoast';
import { Carousel } from '@/src/shared/components/ImageCarousel';
import { ChevronLeft, ExternalLink, Eye, Flame, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
type Props = {
  params: Promise<{ slug: string }>
}
function page({ params }: Props) {
  const { slug } = use(params)
  const router = useRouter()
  const { data: dataBySug } = usePortfolioBySlug(slug)
  const portfolio = dataBySug?.data
  const { mutate: view } = useView(String(dataBySug?.data.id))

  useEffect(() => {
    if (dataBySug?.data?.id) {
      view()
    }
  }, [dataBySug?.data?.id])
  if (!portfolio) return null
  const initials = portfolio.user.username.slice(0, 2).toUpperCase()
  return (
    <div className="min-h-full pb-16">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex w-full items-center gap-1 py-4 text-md syne
         text-(--text-50) hover:text-(--primary) transition-colors sticky top-0 z-50 bg-(--bg)"
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
              <span className="flex items-center gap-1 syne"><Eye size={14} /> {portfolio.views}</span>
              <span className="flex items-center gap-1 syne"><Flame size={14} /> {portfolio.likeCount}</span>

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

        <p className="text-sm text-(--text-50) leading-relaxed">{portfolio.description}</p>

        <div className="border-t border-(--text-20)" />

        <PostRoast portfolioId={String(portfolio.id)} />

        <div>
          <p className="text-md border-b border-(--text-20) text-(--primary) mb-4 lowercase tracking-wider syne">
            {portfolio.roasts.length} roast
          </p>

          {portfolio.roasts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-2xl syne text-(--text-20)">No one has roasted yet</p>
              <p className="text-xl syne text-(--text-20) mt-1">Be the first 🔥</p>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolio.roasts.map((r) => (
                <div key={r.id} className='flex items-end justify-between hover:bg-(--surface) transition duration-150 rounded-sm p-2'>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#3C3489] flex items-center justify-center text-[10px] font-medium text-[#CECBF6] shrink-0 mt-0.5">
                      {r.user.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex gap-5">
                      <div className="flex-1">
                        <span className="text-xs text-(--text-50) font-medium">
                          <Link href={`/profile/${r.user.username}`}>
                            @{r.user.username}
                          </Link>
                        </span>
                        <p className="text-md mt-0.5 leading-relaxed">{r.content}</p>
                      </div>
                    </div>
                  </div>
                  <p className='text-sm text-(--text-20) syne'>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
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