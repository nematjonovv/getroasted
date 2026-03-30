-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_portfolioId_fkey";

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
