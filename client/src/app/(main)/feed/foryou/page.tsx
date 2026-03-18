import Card from "@/src/shared/components/Card";

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
  return (
    <div className="space-y-5">
      <Card
        username={data.username}
        profession={data.profession}
        title={data.title}
        desc={data.desc}
        techstach={data.techstach}
        roast={data.roast}
        slug={data.slug}
        roastCount={data.roastCount}
        isLiked={data.isLiked}
        likeCount={data.likeCount}
        viewCount={data.viewCount}
      />
    </div>
  );
}

export default Foryou;