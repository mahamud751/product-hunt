/*
  Warnings:

  - Added the required column `commentId` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "commentId" TEXT NOT NULL,
ADD COLUMN     "reviewId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
