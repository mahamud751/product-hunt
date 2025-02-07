/*
  Warnings:

  - Added the required column `title` to the `Subcategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
