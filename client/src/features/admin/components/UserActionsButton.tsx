
import { Ban, BanIcon, Trash2 } from "lucide-react";

function UserActionsButton({ userId }: { userId: number }) {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      {/* <button
        className="cursor-pointer text-sm syne hover:text-red-500 transition duration-150">
        <Trash2 />
      </button> */}
      <button
        className="cursor-pointer text-sm syne hover:text-red-500 transition duration-150">
        <Ban />
      </button>
    </div>
  );
}

export default UserActionsButton;