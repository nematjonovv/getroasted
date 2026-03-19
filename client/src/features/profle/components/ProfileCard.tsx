"use client"
import { useMe } from "../../auth/useAuth";

function ProfileCard() {
  const { data: me } = useMe()
  const user = me?.user
  const nameFirstLetter = user?.name?.charAt(0)
  const secondNameFirstLetter = user?.secondname?.charAt(0)
  const COLORS = [
    '#ff4d1c', // red-orange
    '#41b2e6', // blue
    '#764abc', // purple
    '#ffb800', // yellow
    '#06b6d4', // cyan
    '#4caf50', // green
    '#f05033', // red
    '#e91e8c', // pink
  ]
  const getColor = (str: string) => {
    const index = str.charCodeAt(0) % COLORS.length
    return COLORS[index]
  }
  return (
    <div className="w-full flex flex-col items-center space-y-2 border-b-2 border-(--text-20) pb-5">
      <div className="px-5 py-5.5 bg-(--primary)/20 inline-block rounded-full">
        {
          user?.avatar ?
            user?.avatar :
            <p className="text-(--primary) text-2xl">
              {nameFirstLetter}
              {secondNameFirstLetter}
            </p>
        }
      </div>
      <p className="text-(--primary)">
        @{user?.username}
      </p>
      <p className="text-4xl font-semibold">
        {user?.name} {user?.secondname}
      </p>
      <div className="flex items-center gap-2 text-(--text-50)">
        <span className="h-2 w-2 bg-(--spark) rounded-full inline-block"></span>
        <p className="syne text-xl">{user?.profession}</p>
      </div>
      <div className="bg-(--surface) min-w-1/2 border border-(--text-20) round15 flex justify-between items-center">
        <div className="userstat-item hover:bg-(--bg) rounded-l-[15px] cursor-pointer transition duration-300">
          <p className="text-xl">{user?.followers.length}</p>
          <p className="text-(--text-50) syne">Followers</p>
        </div>
        <span className="w-px h-1/2 bg-(--text-20)"></span>
        <div className="userstat-item hover:bg-(--bg) cursor-pointer transition duration-300">
          <p className="text-xl">{user?.following.length}</p>
          <p className="text-(--text-50) syne">Following</p>
        </div>
        <span className="w-px h-1/2 bg-(--text-20)"></span>
        <div className="userstat-item hover:bg-(--bg) rounded-r-[15px] cursor-pointer transition duration-300">
          <p className="text-xl">{user?.portfolios.length}</p>
          <p className="text-(--text-50) syne">Portfolios</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-x-auto scrollbar-hide flex-wrap bg-(--surface) py-4 px-5 round15 border border-(--text-20) min-w-1/2">
        <p className="syne text-(--text-50) font-medium">Tech Stack</p>
        <div className="flex gap-5">
          {user?.techstack.map((stack) => (
            <div
              key={stack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e24] border border-white/10 text-white/75 text-sm whitespace-nowrap shrink-0"
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: getColor(stack) }}
              />
              <p className="syne">{stack}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;