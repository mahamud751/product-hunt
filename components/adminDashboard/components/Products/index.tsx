import React, { useState } from "react";
import ProductList from "./ProductList";
import CategoryManagement from "./CategoryManagement";
import AlternativesManagement from "./AlternativesManagement";
import PendingApprovals from "./PendingApprovals";
import SEOManagement from "./SEOManagement";
import Analytics from "./Analytics";

export default function Products() {
  const [activeTab, setActiveTab] = useState("products");
  const [dateFilter, setDateFilter] = useState("7d");

  const tabs = [
    { id: "products", label: "Products" },
    { id: "categories", label: "Categories" },
    { id: "alternatives", label: "Alternatives" },
    { id: "pending", label: "Pending Approvals" },
    { id: "seo", label: "SEO & Metadata" },
    { id: "analytics", label: "Analytics" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductList dateFilter={dateFilter} />;
      case "categories":
        return <CategoryManagement dateFilter={dateFilter} />;
      case "alternatives":
        return <AlternativesManagement dateFilter={dateFilter} />;
      case "pending":
        return <PendingApprovals dateFilter={dateFilter} />;
      case "seo":
        return <SEOManagement dateFilter={dateFilter} />;
      case "analytics":
        return <Analytics dateFilter={dateFilter} />;
      default:
        return <ProductList dateFilter={dateFilter} />;
    }
  };

  return (
    <div className="p-8">
      {/* Sub Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-[#AF583B] text-[#AF583B]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  );
}
