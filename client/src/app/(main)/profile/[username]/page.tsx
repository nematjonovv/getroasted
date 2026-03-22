"use client"
import ProfileCard from "@/src/features/profle/components/ProfileCard";
import Card from "@/src/shared/components/Card";
import { useProfilePage } from "@/src/shared/hooks/useProfilePage";
import { Flame, Image, LogOut } from "lucide-react";
import Link from "next/link";
import { use } from "react";
type Props = {
  params: Promise<{ username: string }>
}
function ProfilePage({ params }: Props) {
  const { username } = use(params)
  const { isLoading, isOwner, me, user } = useProfilePage(username)
  const portfolio = user?.data
  return (
    <div className="flex flex-col justify-center pt-10">
      <ProfileCard username={username} />
      <div className="w-full min-h-screen flex flex-col py-5">

        {
          portfolio?.portfolios.length === 0 ? (
            isOwner ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <div className="w-18 h-18 rounded-full border border-(--text-20) hover:border-(--accent) flex items-center justify-center">
                  <Image size={32} className="text-(--accent)" strokeWidth={1.5} />
                </div>
                <p className="text-3xl syne font-medium">No portfolios yet</p>
                <p className="text-md syne text-(--text-50) text-center">
                  When you add portfolios, they will appear here for others to roast.
                </p>
                <Link href={"/"} className="float-right border border-(--text-50) px-5 py-2 round15 text-sm syne hover:bg-(--accent) transition duration-150 cursor-pointer active:scale-95">Add portfolio</Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-18 h-18 rounded-full border border-(--text-20) flex items-center justify-center">
                  <Flame size={32} className="text-(--text-50)" strokeWidth={1.5} />
                </div>
                <p className="text-lg font-medium">No portfolios to roast</p>
                <p className="text-sm text-(--text-50) text-center">
                  {username} hasn't added any portfolios yet.
                </p>
              </div>
            )
          ) :
            (
              portfolio?.portfolios.map((p) => (
                <Card
                  key={p.id}
                  id={p.id}
                  username={user?.data.username || ""}
                  profession={user?.data.profession || null}
                  title={p.title}
                  desc={p.description}
                  techstach={user?.data.techstack || []}
                  roast={p.roasts[p.roasts.length - 1]?.content}
                  roastOwner={p.roasts[p.roasts.length - 1]?.user.username}
                  slug={p.slug}
                  roastCount={p.roasts.length}
                  isLiked={p.isLiked}
                  likeCount={p.likeCount}
                  viewCount={p.views}
                  portfolioId={p.id}
                />
              ))
            )
        }
      </div>
    </div>
  );
}

export default ProfilePage;
