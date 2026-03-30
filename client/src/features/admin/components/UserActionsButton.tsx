"use client"
import { Ban, User } from "lucide-react";
import { UseBan } from "../useAdmin";

function UserActionsButton({ userId, isBanned }: { userId: number, isBanned: boolean }) {
  const { mutate: ban } = UseBan(userId)
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      {
        isBanned ? (
          <button
            onClick={() => ban()}
            title="Switch to Admin this user"
            className="cursor-pointer text-sm syne hover:text-red-500 transition duration-150">
            <User />
          </button>
        ) : (
          <button
            onClick={() => ban()}
            title="Ban this user"
            className="cursor-pointer text-sm syne hover:text-red-500 transition duration-150">
            <Ban />
          </button>
        )
      }
    </div>
  );
}

export default UserActionsButton;