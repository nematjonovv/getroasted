
function UserCard({ title, profession }: { title: string, profession?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="py-2 px-2 bg-(--primary)/20 rounded-full text-sm text-(--primary)">
        HN
      </span>
      <div>
        <p>
          @{title}
        </p>
        <p className="text-[10px] text-(--text-50)">
          {profession}
        </p>
      </div>
    </div>
  );
}

export default UserCard;