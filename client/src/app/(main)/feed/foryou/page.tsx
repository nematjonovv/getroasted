"use client"
import { useGetPortfolios } from "@/src/features/portfolio/usePortfolio";
import Card from "@/src/shared/components/Card";
import { Dots } from "@/src/shared/ui/Loader";

function Foryou() {
  const data = {
    username: "hikmatillo_n",
    profession: "Fullstack developer",
    title: "Makon design studio - Fullstack website",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi provident quos officiis, quibusdam aliquid praesentium consequuntur numquam quisquam sunt nobis accusamus.",
    techstach: ["NextJS", "TailwindCSS", "NodeJS"],
    roast: "not terrible.... but questionable",
    slug: "makon-design-studio",
    roastCount: 31,
    isLiked: false,
    likeCount: 124,
    viewCount: 840
  }
  const { data: portfolio, isLoading, isError } = useGetPortfolios()

  return (
    <div className="space-y-5">
      {
        isLoading ? <div className="w-full h-screen flex justify-center items-center"><Dots /></div> : portfolio?.data.map((p) => (
          <Card
            key={p.id}
            username={p.user.username}
            profession={data.profession}
            title={p.title}
            desc={p.description}
            techstach={data.techstach}
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