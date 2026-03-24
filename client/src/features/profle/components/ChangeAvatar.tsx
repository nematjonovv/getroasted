import { Pencil } from "lucide-react";

function ChangeAvatar({ className }: { className: string }) {
  return (
    <div className={`absolute inset-0 w-full h-full bg-black/40 rounded-full justify-center items-center ${className} cursor-pointer`}>
      <Pencil />
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}

export default ChangeAvatar;