import { useCheckFollow, useFollow } from "../useFollow";

function FollowButton({ userId, username }: { userId: string, username: string }) {
  const { mutate: follow, isError } = useFollow({ id: userId, username })
  const { data: isFollowing } = useCheckFollow(userId)

  return (
    <button onClick={() => follow()} className="border-2 round15 border-(--text-20) text-(--text-50) flex flex-2 items-center justify-center py-3 hover:text-(--accent) hover:border-(--accent) transition duration-150 syne cursor-pointer">
      {isFollowing?.data.isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;