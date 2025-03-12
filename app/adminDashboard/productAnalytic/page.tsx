"use client";
import ProductAnalytics from "@/components/adminDashboard/components/Products/ProductAnalytics";
import { useState } from "react";

const Page = () => {
  const [dateFilter, setDateFilter] = useState("7d");
  return (
    <>
      <ProductAnalytics dateFilter={dateFilter} />
    </>
  );
};

export default Page;
