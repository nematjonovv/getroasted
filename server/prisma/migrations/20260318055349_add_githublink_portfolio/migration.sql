/*
  Warnings:

  - Added the required column `slug` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;
