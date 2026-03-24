"use client"
import { useProfilePage } from "@/src/shared/hooks/useProfilePage";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import FollowButton from "../../follow/components/FollowButton";
import ProfileSkeleton from "@/src/shared/components/ProfileSkeleton";
import ProfileThreeDot from "./ProfileThreeDot";
import { useLogout } from "../../auth/useAuth";
import ChangeAvatar from "./ChangeAvatar";
const COLORS = [
  '#ff4d1c',
  '#41b2e6',
  '#764abc',
  '#ffb800',
  '#06b6d4',
  '#4caf50',
  '#f05033',
  '#e91e8c',
]
function ProfileCard({ username }: { username: string }) {
  const { isLoading, isOwner, me, user } = useProfilePage(username)
  const userData = user?.data

  const nameFirstLetter = userData?.username.slice(0, 1).toUpperCase()
  const secondNameFirstLetter = userData?.username.slice(1, 2).toUpperCase()


  const getColor = (str: string) => {
    const index = str.charCodeAt(0) % COLORS.length
    return COLORS[index]
  }
  const logout = useLogout()
  return isLoading ? (
    <ProfileSkeleton />
  ) : (
    <div className="w-full flex flex-col items-center space-y-2 border-b-2 border-(--text-20) pb-5">
      <div className="w-21 h-20 bg-(--primary)/20 inline-block rounded-full">
        <div className="relative w-full h-full flex items-center justify-center group  transition duration-300">
          <p className="text-(--primary) text-2xl uppercase">
            {nameFirstLetter}
            {secondNameFirstLetter}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-(--primary)">
          @{userData?.username}
        </p>
        {isOwner ? <ProfileThreeDot onLogout={logout} /> : null}
      </div>
      <p className="text-4xl font-semibold">
        {userData?.name} {userData?.secondname}
      </p>
      <div className="flex items-center gap-2 text-(--text-50)">
        <span className="h-2 w-2 bg-(--spark) rounded-full inline-block"></span>
        <p className="syne text-xl">{userData?.profession}</p>
      </div>
      <div className="bg-(--surface) min-w-1/2 border border-(--text-20) round15 flex justify-between items-center">
        <div className="userstat-item hover:bg-(--bg) cursor-pointer rounded-l-[15px] transition duration-300">
          <p className="text-xl">{userData?.followingCount}</p>
          <p className="text-(--text-50) syne">Following</p>
        </div>
        <span className="w-px h-1/2 bg-white"></span>
        <div className="userstat-item hover:bg-(--bg) cursor-pointer transition duration-300">
          <p className="text-xl">{userData?.followerCount}</p>
          <p className="text-(--text-50) syne">Followers</p>
        </div>
        <span className="w-px h-1/2 bg-(--text-20)"></span>
        <div className="userstat-item hover:bg-(--bg) rounded-r-[15px] cursor-pointer transition duration-300">
          <p className="text-xl">{userData?.portfolios.length}</p>
          <p className="text-(--text-50) syne">Portfolios</p>
        </div>
      </div>
      {
        isOwner ? "" : <div className="w-1/2 flex items-center gap-5">
          <FollowButton userId={String(user?.data.id)} username={user?.data.username || ""} />
          <Link href={""} className="border-2 border-(--text-20) text-(--text-50) flex flex-1 items-center justify-center py-3  transition duration-150 round15 cursor-not-allowed">
            <MessageSquare />
            {/* hover:text-white hover:border-(--primary) */}
          </Link>
        </div>
      }
      {
        userData?.techstack.length !== 0 ? (
          <div className="flex flex-col gap-2 overflow-x-auto scrollbar-hide flex-wrap bg-(--surface) py-4 px-5 round15 border border-(--text-20) min-w-1/2">
            <div className="flex gap-5">
              {userData?.techstack.map((stack) => (
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
        ) : (
          ""
        )
      }

    </div>
  )
}
{/* <ProfileSkeleton /> */ }
export default ProfileCard;