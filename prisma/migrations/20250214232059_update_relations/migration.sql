-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_alternativeId_fkey";

-- CreateTable
CREATE TABLE "_AlternativeToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlternativeToProduct_AB_unique" ON "_AlternativeToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_AlternativeToProduct_B_index" ON "_AlternativeToProduct"("B");

-- AddForeignKey
ALTER TABLE "_AlternativeToProduct" ADD CONSTRAINT "_AlternativeToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlternativeToProduct" ADD CONSTRAINT "_AlternativeToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
