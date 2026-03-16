"use client"
import { useLogout, useMe } from "@/src/features/auth/useAuth";

function Main() {
  const { data: user, isLoading, isError } = useMe()
  const logut = useLogout()
  return (
    <div className="text-red-500 ">
      Home {user?.user.username}

      <button onClick={logut} className="border py-1 px-2 rounded-md">
        logut
      </button>
    </div>
  );
}

export default Main;