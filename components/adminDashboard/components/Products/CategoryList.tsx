"use client";
import React, { useState } from "react";
import ProductList from "./ProductList";
import CategoryManagement from "./CategoryManagement";
import AlternativesManagement from "./AlternativesManagement";
import PendingApprovals from "./PendingApprovals";
import SEOManagement from "./SEOManagement";
import Analytics from "./Analytics";

const CategoryList = () => {
  const [dateFilter, setDateFilter] = useState("7d");

  return (
    <div className="p-8">
      {/* Section: Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Categories
        </h2>
        <CategoryManagement dateFilter={dateFilter} />
      </section>
    </div>
  );
};

export default CategoryList;
