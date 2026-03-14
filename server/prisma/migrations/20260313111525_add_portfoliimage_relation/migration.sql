-- CreateTable
CREATE TABLE "PortfolioImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "portfolioId" INTEGER NOT NULL,

    CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PortfolioImage" ADD CONSTRAINT "PortfolioImage_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
