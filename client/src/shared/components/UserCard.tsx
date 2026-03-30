import Link from "next/link";
import Avatar from "../ui/Avatar";

function UserCard({ title, profession }: { title: string, profession?: string }) {

  return (
    <div className="flex items-center gap-2">
      <span className="w-10 h-10 bg-linear-to-br from-(--primary) to-(--accent) rounded-full text-sm text-(--primary)">
        <div className="relative w-full h-full flex items-center justify-center group  transition duration-300">
          <Avatar name={title} role="USER" />
        </div>
      </span>
      <div>
        <div onClick={(e) => e.stopPropagation()}>
          <Link href={`/profile/${title}`} className="text-(--text)">
            @{title}
          </Link>
        </div>
        <p className="text-[10px] text-(--text-50)">
          {profession}
        </p>
      </div>
    </div>
  );
}

export default UserCard;