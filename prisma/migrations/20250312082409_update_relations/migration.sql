-- CreateTable
CREATE TABLE "_SameProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SameProducts_AB_unique" ON "_SameProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_SameProducts_B_index" ON "_SameProducts"("B");

-- AddForeignKey
ALTER TABLE "_SameProducts" ADD CONSTRAINT "_SameProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SameProducts" ADD CONSTRAINT "_SameProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
