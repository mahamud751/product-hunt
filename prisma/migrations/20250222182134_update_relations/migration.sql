/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "education" JSONB,
ADD COLUMN     "experiences" JSONB,
ADD COLUMN     "headline" TEXT,
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "socialLinks" JSONB,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
