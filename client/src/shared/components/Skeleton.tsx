


export default function CardSkeleton() {
  return (
    <div className={`w-full rounded-xl bg-(--surface) hover:bg-(--surface)/50 transition duration-100 cursor-pointer flex flex-col px-7.5 py-5 `}>
      <div className=" rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-10 w-10 bg-(--card) rounded-full text-sm text-(--primary)"></span>
            <div>
              <p className="bg-(--card) w-40 h-5 rounded-md">

              </p>
              <p className="bg-(--card) w-30 h-3 rounded-md mt-2"></p>
            </div>
          </div>
          <span className="bg-(--card) w-30 h-7 rounded-md"></span>
        </div>
        <div className="space-y-2.5 my-4 ">
          <p className="bg-(--card) w-80 h-10 rounded-md mt-5"></p>
          <p className="bg-(--card) w-full h-20 rounded-md"></p>
        </div>
        <div className="flex gap-4 items-center">
          <span className="bg-(--card) w-20 h-5 rounded-md"></span>
          <span className="bg-(--card) w-30 h-5 rounded-md"></span>
          <span className="bg-(--card) w-20 h-5 rounded-md"></span>
          <span className="bg-(--card) w-50 h-5 rounded-md"></span>
        </div>
      </div>
      <div className="w-full h-px my-5 bg-(--text-50)" />
      <div className="rounded-xl relative">
        <div className="w-full overflow-y-scroll feed-scroll space-y-2">
          <div className="w-full bg-(--card)/50 flex items-center justify-between px-5 h-20 rounded-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-10 w-10 bg-(--card) rounded-full text-sm text-(--primary)"></span>
                <div>
                  <p className="bg-(--card) w-20 h-3 rounded-md">

                  </p>
                </div>
              </div>
              <p className="bg-(--card) w-70 h-5 rounded-md"></p>
            </div>
            <span className="bg-(--card) w-40 h-5 rounded-md"></span>
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          <button className={`bg-(--card) w-10 h-5 rounded-md`}></button>
          <button className="bg-(--card) w-10 h-5 rounded-md"></button>
          <button className="bg-(--card) w-10 h-5 rounded-md"></button>
        </div>
      </div>
    </div>
  );
}
