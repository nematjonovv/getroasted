"use client"
import { useMe } from "@/src/features/auth/useAuth";
import Tabs from "@/src/features/portfolio/components/Tabs";
import { useFollowingPortfolio } from "@/src/features/portfolio/usePortfolio";
import Card from "@/src/shared/components/Card";
import { Dots } from "@/src/shared/ui/Loader";

function Following() {
  const { data: me } = useMe()
  const { data: portfolio, isLoading, isError } = useFollowingPortfolio(String(me?.user.id))
  return (
    <div className="space-y-5">
      <Tabs />
      {
        isLoading ? <div className="w-full h-screen flex justify-center items-center"><Dots /></div> : portfolio?.data.map((p) => (
          <Card
            key={p.id}
            username={p.user.username}
            profession={p.user.profession || null}
            title={p.title}
            desc={p.description}
            techstach={p.techstack}
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
      }
    </div>
  );
}

export default Following;