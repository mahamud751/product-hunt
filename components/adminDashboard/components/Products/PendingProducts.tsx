// PendingProducts.tsx
import React from "react";
import { getProducts } from "@/lib/server-actions";
import PendingApprovals from "./PendingApprovals";

export default async function PendingProducts() {
  const initialPage = 0;
  const initialRowsPerPage = 10;

  // Fetch only pending products
  const { products, totalProducts } = await getProducts(
    initialPage,
    initialRowsPerPage,
    "PENDING" // Add status filter for pending products
  );

  console.log(products);

  return (
    <div className="p-8">
      <section className="mb-12">
        <PendingApprovals
          //@ts-ignore
          initialProducts={products}
          initialTotalProducts={totalProducts}
        />
      </section>
    </div>
  );
}
