-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'REVIEW';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "reviewId" TEXT;
