/*
  Warnings:

  - You are about to drop the column `commentId` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `ActivityLog` table. All the data in the column will be lost.
  - Added the required column `details` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_reviewId_fkey";

-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "commentId",
DROP COLUMN "reviewId",
DROP COLUMN "details",
ADD COLUMN     "details" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "ActivityLog_userId_idx" ON "ActivityLog"("userId");
