/*
  Warnings:

  - Added the required column `linekdin` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promoCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promoExpire` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promoOffer` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggestUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoLink` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weburl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "linekdin" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "promoCode" TEXT NOT NULL,
ADD COLUMN     "promoExpire" TEXT NOT NULL,
ADD COLUMN     "promoOffer" TEXT NOT NULL,
ADD COLUMN     "suggestUrl" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL,
ADD COLUMN     "videoLink" TEXT NOT NULL,
ADD COLUMN     "weburl" TEXT NOT NULL;
