"use client"
import Tabs from "@/src/features/portfolio/components/Tabs";
import { useGetPortfolios } from "@/src/features/portfolio/usePortfolio";
import Card from "@/src/shared/components/Card";
import { Dots } from "@/src/shared/ui/Loader";

function Foryou() {
  const { data: portfolio, isLoading } = useGetPortfolios()

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

export default Foryou;