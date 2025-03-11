import React from "react";
import ProductList from "./ProductList";

import { getProducts } from "@/lib/server-actions";

export default async function ProductsList() {
  const initialPage = 0;
  const initialRowsPerPage = 10;
  const { products, totalProducts } = await getProducts(
    initialPage,
    initialRowsPerPage
  );

  return (
    <div className="p-8">
      {/* Section: Products */}
      <section className="mb-12">
        <ProductList
          //@ts-ignore
          initialProducts={products}
          initialTotalProducts={totalProducts}
        />
      </section>

      {/* <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Alternatives
        </h2>
        <AlternativesManagement dateFilter={dateFilter} />
      </section>

     
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Pending Approvals
        </h2>
        <PendingApprovals dateFilter={dateFilter} />
      </section>

    
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          SEO & Metadata
        </h2>
        <SEOManagement dateFilter={dateFilter} />
      </section>

    
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Analytics
        </h2>
        <Analytics dateFilter={dateFilter} />
      </section> */}
    </div>
  );
}
