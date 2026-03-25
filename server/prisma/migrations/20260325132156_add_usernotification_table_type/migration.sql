/*
  Warnings:

  - Added the required column `type` to the `UserNorification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserNorification" ADD COLUMN     "type" TEXT NOT NULL;
