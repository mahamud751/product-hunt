"use client";
import { getFilteredProducts } from "@/lib/server-actions";
import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  headline: string;
  rank: number;
  description: string;
  logo: string;
  releaseDate: string;
  website: string;
  twitter: string;
  discord: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: string;
}

interface FilteredProductsProps {
  products: Product[];
}

const FilteredProducts: React.FC<FilteredProductsProps> = ({ products }) => {
  const [filter, setFilter] = useState<"day" | "week" | "month">("day");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = async (newFilter: "day" | "week" | "month") => {
    setFilter(newFilter);
    const updatedProducts = await getFilteredProducts(newFilter);
    setFilteredProducts(updatedProducts);
  };
  return (
    <div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 ${
            filter === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } rounded-md`}
          onClick={() => handleFilterChange("day")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 ${
            filter === "week"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } rounded-md`}
          onClick={() => handleFilterChange("week")}
        >
          This Week
        </button>
        <button
          className={`px-4 py-2 ${
            filter === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } rounded-md`}
          onClick={() => handleFilterChange("month")}
        >
          This Month
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-md p-4"
          >
            <img
              src={product.logo || "/default-product-image.jpg"}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.headline}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 block"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredProducts;
