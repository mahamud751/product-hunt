-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "alternativeId" TEXT;

-- CreateTable
CREATE TABLE "Alternative" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Alternative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alternative_name_key" ON "Alternative"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "Alternative"("id") ON DELETE SET NULL ON UPDATE CASCADE;
