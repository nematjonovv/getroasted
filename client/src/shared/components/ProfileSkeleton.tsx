
function ProfileSkeleton() {
  return (
    <div className="w-full flex flex-col items-center space-y-2 border-b-2 border-(--text-20) pb-5">
      <div className="h-20 w-20 animate-shimmer inline-block rounded-full"></div>
      <p className="animate-shimmer w-20 h-5 round15"></p>
      <p className="animate-shimmer w-50 h-6 round15"></p>
      <div className="animate-shimmer w-20 h-5 round15"></div>
      <div className="animate-shimmer min-w-1/2 round15 h-20"></div>
      <div className="animate-shimmer round15 min-w-1/2 h-20"></div>
    </div>
  );
}

export default ProfileSkeleton;