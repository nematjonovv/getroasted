/*
  Warnings:

  - Added the required column `isRead` to the `UserNorification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `UserNorification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserNorification" ADD COLUMN     "isRead" BOOLEAN NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL;
