/*
  Warnings:

  - Added the required column `logo` to the `Alternative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alternative" ADD COLUMN     "logo" TEXT NOT NULL;
