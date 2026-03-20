
const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

function CardSkeleton() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-2xl space-y-5 border border-white/5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-9 h-9 rounded-full bg-white/10 ${shimmer}`}
          />
          {/* Username */}
          <div
            className={`h-4 w-28 rounded-md bg-white/10 ${shimmer}`}
          />
        </div>
        {/* Badge */}
        <div
          className={`h-8 w-36 rounded-full bg-white/10 ${shimmer}`}
        />
      </div>

      {/* Title */}
      <div className={`h-6 w-32 rounded-md bg-white/10 ${shimmer}`} />

      {/* See all link */}
      <div className={`h-3 w-16 rounded-md bg-white/10 ${shimmer}`} />

      {/* Tags */}
      <div className="flex gap-2">
        {[64, 88, 64].map((w, i) => (
          <div
            key={i}
            className={`h-7 rounded-full bg-white/10 ${shimmer}`}
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Comment row */}
      <div className="flex items-center justify-between pl-3 border-l-2 border-[#c0392b]/60">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full bg-white/10 ${shimmer}`}
          />
          <div className="space-y-2">
            <div
              className={`h-3 w-20 rounded-md bg-white/10 ${shimmer}`}
            />
            <div
              className={`h-3 w-32 rounded-md bg-white/10 ${shimmer}`}
            />
          </div>
        </div>
        {/* Roasts badge */}
        <div
          className={`h-4 w-24 rounded-md bg-white/10 ${shimmer}`}
        />
      </div>

      {/* Footer icons */}
      <div className="flex items-center gap-5 pt-1">
        {[40, 40, 40].map((w, i) => (
          <div
            key={i}
            className={`h-4 rounded-md bg-white/10 ${shimmer}`}
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    </div>
  );
}
