"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useState } from "react";
import {
  Star,
  ArrowRight,
  Search,
  Twitter,
  Facebook,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Layout,
} from "lucide-react";

import { getProductsByCategoryName } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/services/types";

interface CategoryPageClientProps {
  products: Product[];
  category: string;
}
const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  products,
  category,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("highest");
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center text-sm text-gray-600">
          <a href="/" className="hover:text-[#AF583B]">
            Home
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href="/categories" className="hover:text-[#AF583B]">
            Categories
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">AI Notetakers</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#1F1F1F] mb-4">
                The best AI notetakers to use in 2025
              </h1>
              <p className="text-gray-600 mb-6">
                AI Notetakers automatically transcribe and summarize meetings,
                interviews, or conversations in real-time using artificial
                intelligence. These tools capture key points, action items, and
                decisions, allowing users to focus on the discussion instead of
                manual note-taking.
              </p>

              {/* Social Share */}
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in AI notetakers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
              >
                <option value="highest">Highest Rated</option>
                <option value="trending">Trending</option>
                <option value="recent">Recent Launches</option>
              </select>
            </div>

            {/* Product List */}
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#F5F5F5] rounded-lg border border-gray-200/50 hover:shadow-sm transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <img
                        src={product.logo}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {product?.name}{" "}
                              <span className="text-gray-500">-</span>{" "}
                              {product?.headline?.slice(0, 30)}
                            </h3>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">2</span>
                            <span className="ml-1 text-sm text-gray-500">
                              (20 reviews)
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {product.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm">
                              <Layout className="w-4 h-4" />
                              <span>
                                {product?.category?.name.slice(0, 15)}
                              </span>
                            </div>
                            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                              {product.price}
                            </span>
                          </div>
                          <button className="bg-[#AF583B] text-white px-4 py-2 rounded-md hover:bg-[#8F4731] transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-md ${
                    currentPage === page
                      ? "bg-[#AF583B] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="w-5 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            {/* Ad Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
              <div className="flex items-start">
                <span className="text-xs text-gray-500 ml-auto">Ad</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=64&h=64&fit=crop"
                  alt="Efficient App"
                  className="w-8 h-8 rounded-lg"
                />
                <h3 className="font-bold text-xl">Efficient App</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Not all Open Source alternatives are equal — Narrow down the
                best, without the bullsh*t
              </p>
              <button className="w-full bg-[#1F1F1F] text-white py-3 px-4 rounded-md hover:bg-black transition-colors flex items-center justify-center gap-2">
                Visit Efficient App
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Featured Products */}
            <div className="bg-white rounded-lg">
              <h2 className="font-bold text-lg mb-4">Featured Products</h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start p-4 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                  >
                    <img
                      src={product.logo}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-3 flex-1">
                      <h3 className="font-medium text-sm">
                        {product.name} <span className="text-gray-500">-</span>{" "}
                        {product.headline}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPageClient;
