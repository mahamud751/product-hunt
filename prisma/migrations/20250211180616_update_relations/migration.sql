/*
  Warnings:

  - The `views` column on the `Alternative` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Alternative" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3),
DROP COLUMN "views",
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
