import { Eye, Flame, MessageSquare, Trash } from "lucide-react";
import { IPortfolio } from "../admin.type";
import UserCard from "@/src/shared/components/UserCard";

type Props = {
  portfolio: IPortfolio
}

function PortfolioCard({ portfolio }: Props) {
  return (
    <div className="round15 bg-(--card) border border-(--text-20)">
      <div className="w-full h-40">
        <img
          className="object-cover h-full w-full rounded-t-[15px]"
          src={portfolio?.portfolioImages[0].imageUrl}
          alt={String(portfolio.portfolioImages[0].portfolioId)} />
      </div>
      <div className="p-3 space-y-2 pb-3 border-b border-(--text-10)">
        <p className="syne text-(--text) text-xl">{portfolio?.title}</p>
        <UserCard title={portfolio.user.username} />
        <div className="flex gap-3">
          <span className="flex gap-1 items-center text-sm text-(--text-50)">
            <Eye size={17} />
            {portfolio.views}
          </span>
          <span className="flex gap-1 items-center text-sm text-(--text-50)">
            <Flame size={17} />
            {portfolio.likes.length}
          </span>
          <span className="flex gap-1 items-center text-sm text-(--text-50)">
            <MessageSquare size={17} />
            {portfolio.roasts.length}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap py-3 px-3 gap-5">
        <button className="flex-1 flex items-center justify-center gap-1 h-10 bg-transparent border border-(--text-20) round15 text-(--text-50) hover:border-(--accent) hover:text-(--primary) cursor-pointer">
          <Eye size={18} />Preview
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 h-10 bg-transparent border border-(--text-20) round15 text-(--text-50) hover:border-red-500 hover:text-red-500 cursor-pointer">
          <Trash size={19} />Delete
        </button>
      </div>
    </div>
  );
}

export default PortfolioCard;