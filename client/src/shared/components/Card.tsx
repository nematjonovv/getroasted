import Link from "next/link";
import PorfessionBadge from "./PorfessionBadge";
import UserCard from "./UserCard";
import Techstack from "./Techstack";
import { Eye, Flame, MessageSquare, MoveRight } from "lucide-react";

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
}

function Card({ desc, isLiked, likeCount, profession,
  roast, roastCount, slug, techstach, title, username, viewCount
}: Props) {


  return (
    <div className="w-full rounded-xl bg-(--surface) hover:bg-(--surface)/50 transition duration-100 cursor-pointer flex flex-col px-7.5 py-5">
      <div className=" rounded-xl">
        <div className="flex items-center justify-between">
          <UserCard title={username} />
          <PorfessionBadge title={profession} />
        </div>
        <div className="space-y-2.5 my-4 ">
          <p className="syne text-2xl">
            {title}
          </p>
          <p className="text-sm text-(--text-50) syne">{desc.slice(0, 190)}... <Link href={`/feed/portfolio/${slug}`} className="text-(--accent) text-sm syne">see all</Link></p>
        </div>
        <Techstack tech={techstach} />
      </div>
      <div className="w-full h-px my-5 bg-(--text-50)" />
      <div className="rounded-xl">
        <div className="w-full overflow-y-scroll feed-scroll space-y-2">
          <div className="w-full bg-(--bg) rounded-r-2xl border-l-4 border-l-(--primary) py-3 px-4 flex items-center justify-between hover:bg-(--bg)/50">
            <div className="flex items-center gap-3">
              <UserCard title="ahmad_k" />
              <p className="text-(--text-50)">
                {roast}
              </p>
            </div>
            <Link href={`/feed/portfolio/${"asd"}`} className="flex items-center gap-1 text-(--primary) syne text-sm flex-nowrap w-30 justify-end"> +{roastCount} roasts <MoveRight size={20} /></Link>
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          <button className={`flex text-sm syne items-center gap-1 cursor-pointer ${isLiked ? "text-(--primary)" : "text-(--text-50)"}`}>
            <Flame /> {likeCount}
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