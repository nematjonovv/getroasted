import Link from "next/link";
import PorfessionBadge from "./PorfessionBadge";
import UserCard from "./UserCard";
import Techstack from "./Techstack";
import { Eye, Flame, MessageSquare, MoveRight } from "lucide-react";
import { useLike } from "@/src/features/portfolio/usePortfolio";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { portfolioApi } from "@/src/features/portfolio/portfolio.api";
import { queryClient } from "../lib/queryClient";
import { useMe } from "@/src/features/auth/useAuth";
import { useRouter } from "next/navigation";

type Props = {
  username: string
  profession: string,
  title: string
  desc: string
  techstach: string[]
  roast: string
  slug: string
  roastCount: number
  isLiked: boolean
  likeCount: number
  viewCount: number
  roastOwner: string
  portfolioId: number
}

function Card({ desc, isLiked, likeCount, profession,
  roast, roastCount, slug, techstach, title, username, viewCount, roastOwner, portfolioId
}: Props) {

  const [liked, setLiked] = useState(isLiked)
  const [count, setCount] = useState(likeCount)

  const { mutate: like } = useMutation({
    mutationFn: () => portfolioApi.like(portfolioId),
    onMutate: () => {
      setLiked(prev => !prev)
      setCount(prev => liked ? prev - 1 : prev + 1)
    },
    onError: () => {
      setLiked(isLiked)
      setCount(likeCount)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] })
    }
  })
  const router = useRouter()
  const { data } = useMe()
  return (
    <div onClick={() => router.push(`/feed/portfolio/${String(portfolioId)}`)} className={`w-full rounded-xl bg-(--surface) hover:bg-(--surface)/50 transition duration-100 cursor-pointer flex flex-col px-7.5 py-5 ${data?.user.username === username ? "hidden" : ""}`}>
      <div className=" rounded-xl">
        <div className="flex items-center justify-between">
          <UserCard title={username} />
          <PorfessionBadge title={profession} />
        </div>
        <div className="space-y-2.5 my-4 ">
          <p className="syne text-2xl">
            {title}
          </p>
          <p className="text-sm text-(--text-50) syne">{desc?.slice(0, 190)}... <Link href={`/feed/portfolio/${slug}`} className="text-(--accent) text-sm syne">see all</Link></p>
        </div>
        <Techstack tech={techstach} />
      </div>
      <div className="w-full h-px my-5 bg-(--text-50)" />
      <div className="rounded-xl relative">
        <div className="w-full overflow-y-scroll feed-scroll space-y-2">
          <div className="w-full bg-(--bg) rounded-r-2xl border-l-4 border-l-(--primary) py-3 px-4 flex items-center justify-between hover:bg-(--bg)/50">
            <div className="flex items-center gap-3">
              <UserCard title={roastOwner} />
              <p className="text-(--text-50)">
                {roast}
              </p>
            </div>
            <Link href={`/feed/portfolio/${"asd"}`} className="flex items-center gap-1 text-(--primary) syne text-sm flex-nowrap w-30 justify-end"> +{roastCount} roasts <MoveRight size={20} /></Link>
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          <button onClick={(e) => { e.stopPropagation(); like() }} className={`flex z-50 text-sm syne items-center gap-1 cursor-pointer ${liked ? "text-(--primary)" : "text-(--text-50)"}`}>
            <Flame />{count}
          </button>
          <button className="flex text-(--text-50) text-sm syne
          items-center gap-1 cursor-pointer">
            <MessageSquare /> {roastCount}
          </button>
          <button className="flex text-(--text-50) text-sm syne
          items-center gap-1 cursor-pointer">
            <Eye /> {viewCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;