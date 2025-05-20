/*
  Warnings:

  - Added the required column `languages` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "language" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "languages" TEXT NOT NULL;
