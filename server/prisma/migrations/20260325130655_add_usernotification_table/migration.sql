-- CreateTable
CREATE TABLE "UserNorification" (
    "id" SERIAL NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserNorification_id_key" ON "UserNorification"("id");

-- AddForeignKey
ALTER TABLE "UserNorification" ADD CONSTRAINT "UserNorification_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNorification" ADD CONSTRAINT "UserNorification_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
