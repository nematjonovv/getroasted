import RoleDistribution from "@/src/features/admin/components/RoleDistribution";
import TotalPortfolios from "@/src/features/admin/components/TotalPortfolios";
import TotalRoasts from "@/src/features/admin/components/TotalRoast";
import TotalUsers from "@/src/features/admin/components/TotalUsers";
import Topbar from "@/src/shared/components/admin/Topbar";

function Overview() {

  return (
    <div className="h-full w-full">
      <Topbar pageTitle="Overview" />
      <div className="w-full h-full overflow-y-scroll feed-scroll flex flex-col gap-5 py-5 px-8">
        <div className="w-full syne text-(--text) flex items-center gap-5">
          <TotalUsers />
          <TotalPortfolios />
          <TotalRoasts />
        </div>
        <div className="w-full h-fit flex gap-5">
          <RoleDistribution />
          {/* <div className="h-full flex-1"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Overview;