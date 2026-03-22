"use client"
import { useMe } from "@/src/features/auth/useAuth";
import Tabs from "@/src/features/portfolio/components/Tabs";
import { useGetPortfolios } from "@/src/features/portfolio/usePortfolio";
import Card from "@/src/shared/components/Card";
import PorfessionBadge from "@/src/shared/components/PorfessionBadge";
import CardSkeleton from "@/src/shared/components/Skeleton";
import Techstack from "@/src/shared/components/Techstack";
import UserCard from "@/src/shared/components/UserCard";
import { Dots } from "@/src/shared/ui/Loader";

function Foryou() {
  const { data: portfolio, isLoading } = useGetPortfolios()
  const { data } = useMe()

  return (
    <div className="space-y-5">
      <Tabs />
      {
        isLoading ?
          <div className="flex flex-col gap-5">
            <CardSkeleton />
            <CardSkeleton />
          </div> :
          portfolio?.data.filter((u) => u.user.username !== data?.user.username).map((p) => (
            <Card
              key={p.id}
              id={p.id}
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

export default Foryou;