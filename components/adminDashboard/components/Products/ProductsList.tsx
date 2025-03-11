"use client";
import React, { useState } from "react";
import ProductList from "./ProductList";
import CategoryManagement from "./CategoryManagement";
import AlternativesManagement from "./AlternativesManagement";
import PendingApprovals from "./PendingApprovals";
import SEOManagement from "./SEOManagement";
import Analytics from "./Analytics";

const ProductsList = () => {
  const [dateFilter, setDateFilter] = useState("7d");

  return (
    <div className="p-8">
      {/* Section: Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Products
        </h2>
        <ProductList dateFilter={dateFilter} />
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
};

export default ProductsList;
