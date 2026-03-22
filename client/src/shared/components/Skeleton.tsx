


export default function CardSkeleton() {
  return (
    <div className={`w-full rounded-xl bg-(--surface) animate-shimmer px-7.5 py-5 `}>
      <div className=" rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className=" h-10 w-10 bg-(--card)/50 rounded-full"></span>
            <div>
              <p className="bg-(--card)/50  w-40 h-5 rounded-md"></p>
              <p className="bg-(--card)/50  w-30 h-3 rounded-md mt-2"></p>
            </div>
          </div>
          <span className="bg-(--card)/50 w-30 h-7 rounded-md "></span>
        </div>
        <div className="space-y-2.5 my-4 ">
          <p className=" bg-(--card)/50 w-80 h-10 rounded-md mt-5"></p>
          <p className=" bg-(--card)/50 w-full h-20 rounded-md"></p>
        </div>
        <div className="bg-(--card)/50  w-50 h-5 rounded-md"></div>
      </div>
      <div className="w-full h-px my-5 bg-(--surface) " />
      <div className="rounded-xl">
        <div className="w-full space-y-2">
          <div className="w-full bg-(--card)/50 flex items-center justify-between px-5 h-20 rounded-md ">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-10 w-10 bg-(--card)/50  rounded-full"></span>
                <div className="bg-(--card)/50 w-20 h-3 rounded-md "></div>
              </div>
              <p className="bg-(--card)/50 w-70 h-5 rounded-md "></p>
            </div>
            <span className="bg-(--card)/50 w-40 h-5 rounded-md "></span>
          </div>
        </div>

        <div className="bg-(--card)/50 w-40 mt-5  h-5 rounded-md"></div>
      </div>
    </div>
  );
}
