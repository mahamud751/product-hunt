-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isMaker" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "makers" TEXT[],
ADD COLUMN     "photos" TEXT[];
