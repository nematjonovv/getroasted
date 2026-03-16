
function StaticCard({ title }: { title: string }) {
  return (
    <div className=" p-7.5 border border-(--text-20) bg-(--surface) round15">
      <div className="flex items-center gap-3 rounded-2xl">
        <div className="py-3 px-3.5 rounded-full bg-(--primary)/20 flex items-center justify-center shrink-0">
          <span className="text-(--primary)/50 text-sm font-semibold">AK</span>
        </div>

        <div className="flex flex-col">
          <span className="text-white text-sm font-semibold dmsans leading-tight">Ahmad.K</span>
          <span className="text-gray-400 text-xs leading-tight">UI/UX Designer</span>
        </div>
      </div>

      <p className="text-xl text-(--text-50) mt-5">
        {title}
      </p>
    </div>
  );
}

export default StaticCard;