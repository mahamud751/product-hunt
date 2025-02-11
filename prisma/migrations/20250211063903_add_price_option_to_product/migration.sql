/*
  Warnings:

  - Made the column `priceOption` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "priceOption" SET NOT NULL;
