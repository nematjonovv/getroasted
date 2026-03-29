import AdminPortfolios from "@/src/features/admin/components/AdminPortfolios";
import PortfolioFiltering from "@/src/features/admin/components/PortfolioFiltering";
import Topbar from "@/src/shared/components/admin/Topbar";

function page() {
  return (
    <div className="h-full w-full">
      <Topbar pageTitle="Portfolios" />
      <AdminPortfolios />
    </div>
  );
}

export default page;