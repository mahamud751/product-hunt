"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  Edit3,
  Trash2,
  Star,
  Upload,
  Download,
  Save,
} from "lucide-react";
import Image from "next/image";
import { getProducts, updateProduct } from "@/lib/server-actions";
import { toast } from "sonner";
import { Category } from "@/services/types";

// Updated ProductData to include all fields from updateProduct and Prisma model
interface ProductData {
  name: string;
  banner?: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  releaseDate: string;
  website: string;
  twitter: string;
  discord: string;
  images?: string[];
  isMaker: boolean;
  makers: string[];
  photos?: string[];
  tags?: string[];
  linkedin?: string;
  weburl?: string;
  suggestUrl?: string;
  price?: string;
  promoCode?: string;
  promoExpire?: string;
  promoOffer?: string;
  videoLink?: string; // Added from Prisma model
  priceOption?: string; // Added from Prisma model
  alternativeId?: string; // Added from Prisma model
}

interface Product {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  releaseDate: string;
  website: string;
  twitter: string;
  discord: string;
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "ACTIVE" | "REJECTED";
  categoryId: string;
  subcategoryId?: string;
  price?: string;
  banner?: string;
  isMaker: boolean;
  makers: string[];
  photos: string[];
  featured: boolean;
  views: number;
  upvotes?: number;
  averageRating?: number;
  category: { name: string };
  tags: string[];
  linkedin?: string;
  weburl?: string;
  suggestUrl?: string;
  promoCode?: string;
  promoExpire?: string;
  promoOffer?: string;
  videoLink?: string;
  priceOption?: string;
  alternativeId?: string;
}

interface ProductListProps {
  initialProducts: Product[];
  initialTotalProducts: number;
  dateFilter: string;
  initialCategories: Category[];
}

export default function ProductList({
  initialProducts,
  initialTotalProducts,
  dateFilter,
  initialCategories,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [totalProducts, setTotalProducts] = useState(initialTotalProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pricingFilter, setPricingFilter] = useState("All");
  const [sortBy, setSortBy] = useState<
    "name" | "views" | "upvotes" | "updatedAt"
  >("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { products: fetchedProducts, totalProducts: total } =
          await getProducts(
            page,
            rowsPerPage,
            statusFilter === "All"
              ? undefined
              : (statusFilter as "PENDING" | "ACTIVE" | "REJECTED")
          );

        const filteredProducts = fetchedProducts.filter((product) => {
          const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          const matchesCategory =
            categoryFilter === "All" || product.categoryId === categoryFilter;
          const matchesPricing =
            pricingFilter === "All" ||
            (pricingFilter === "Free" && !product.price) ||
            (pricingFilter === "Paid" && product.price) ||
            (pricingFilter === "Freemium" && product.price);
          return matchesSearch && matchesCategory && matchesPricing;
        });
        // @ts-ignore
        setProducts(filteredProducts);
        setTotalProducts(total);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    page,
    rowsPerPage,
    searchQuery,
    categoryFilter,
    statusFilter,
    pricingFilter,
  ]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setEditForm(product);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSave = async () => {
    if (!isEditing || !editForm.id) return;

    setLoading(true);
    try {
      const slug =
        editForm.slug ||
        (editForm.name ? generateSlug(editForm.name) : "untitled");
      await updateProduct(editForm.id, {
        name: editForm.name || "Untitled",
        banner: editForm.banner,
        slug,
        headline: editForm.headline || "",
        description: editForm.description || "",
        logo: editForm.logo || "",
        releaseDate: editForm.releaseDate || "",
        website: editForm.website || "",
        twitter: editForm.twitter || "",
        discord: editForm.discord || "",
        images: editForm.photos || [],
        isMaker: editForm.isMaker ?? true,
        makers: editForm.makers || [],
        photos: editForm.photos || [],
        tags: editForm.tags || [],
        linkedin: editForm.linkedin || "",
        weburl: editForm.weburl || "",
        suggestUrl: editForm.suggestUrl || "",
        price: editForm.price || "",
        promoCode: editForm.promoCode || "",
        promoExpire: editForm.promoExpire || "",
        promoOffer: editForm.promoOffer || "",
        videoLink: editForm.videoLink || "", // Added
        priceOption: editForm.priceOption || "", // Added
        //@ts-ignore
        alternativeId: editForm.alternativeId || "", // Added
      });

      const { products: updatedProducts } = await getProducts(
        page,
        rowsPerPage
      );
      //@ts-ignore
      setProducts(updatedProducts);
      toast("Product updated successfully!");
      setIsEditing(null);
      setEditForm({});
    } catch (error) {
      console.error("Error updating product:", error);
      toast("Failed to update product. Slug may already exist.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPricingColor = (price?: string) => {
    if (!price) return "bg-green-100 text-green-800";
    return "bg-blue-100 text-blue-800";
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "views" || sortBy === "upvotes") {
      const aValue = sortBy === "views" ? a.views : a.upvotes || 0;
      const bValue = sortBy === "views" ? b.views : b.upvotes || 0;
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    const compareValue = (val1: string, val2: string) =>
      sortOrder === "asc" ? val1.localeCompare(val2) : val2.localeCompare(val1);
    return compareValue(a[sortBy] || "", b[sortBy] || "");
  });

  const totalPages = Math.ceil(totalProducts / rowsPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${
            page === i
              ? "bg-[#AF583B] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Products</h2>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {initialCategories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
            value={pricingFilter}
            onChange={(e) => setPricingFilter(e.target.value)}
          >
            <option value="All">All Pricing</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
            <option value="Freemium">Freemium</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "name" | "views" | "upvotes" | "updatedAt"
                )
              }
            >
              <option value="name">Sort by Name</option>
              <option value="views">Sort by Views</option>
              <option value="upvotes">Sort by Upvotes</option>
              <option value="updatedAt">Sort by Updated</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedProducts.length} products selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Star className="w-4 h-4" />
              <span>Feature</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metrics
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : sortedProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              sortedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === product.id ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <input
                            type="text"
                            value={editForm.logo || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, logo: e.target.value })
                            }
                            placeholder="Logo URL"
                            className="w-1/3 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
                          />
                          <Image
                            src={editForm.logo || ""}
                            alt=""
                            height={40}
                            width={40}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
                        />
                        <input
                          type="text"
                          value={editForm.slug || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, slug: e.target.value })
                          }
                          placeholder="Slug (auto-generated if empty)"
                          className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
                        />
                        <textarea
                          value={editForm.description || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-lg object-cover"
                            src={product.logo}
                            alt=""
                            height={40}
                            width={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            {product.featured && (
                              <Star className="w-4 h-4 ml-2 text-yellow-400 fill-current" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product?.description?.slice(0, 40) || "N/A"}...
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product?.category?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPricingColor(
                          product.price
                        )}`}
                      >
                        {product.price ? "Paid" : "Free"}
                      </span>
                      {product.price && (
                        <div className="text-sm text-gray-500 mt-1">
                          From ${product.price}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="w-16">Views:</span>
                        <span className="font-medium text-gray-900">
                          {product.views.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="w-16">Upvotes:</span>
                        <span className="font-medium text-gray-900">
                          {(product.upvotes || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="w-16">Rating:</span>
                        <span className="font-medium text-gray-900">
                          {product.averageRating || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(product.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {isEditing === product.id ? (
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className={`text-green-600 hover:text-green-700 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-[#AF583B] hover:text-[#8E4730]"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-900">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, totalProducts)} of {totalProducts}{" "}
          products
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
