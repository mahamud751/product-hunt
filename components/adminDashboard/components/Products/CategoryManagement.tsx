"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  Edit3,
  Trash2,
  MoveRight,
  Save,
} from "lucide-react";
import CreateCategoryModal from "./CreateCategoryModal";
import { getCategories, categoryUpdate } from "@/lib/server-actions";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description: string;
  title: string;
  url: string;
  status: "PENDING" | "ACTIVE" | "REJECTED";
  products: any[];
  subcategories: any[];
  slug?: string;
  productCount?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
}

interface CategoryManagementProps {
  initialCategories: Category[];
  initialTotalCategories: number;
  dateFilter: string;
}

export default function CategoryManagement({
  initialCategories,
  initialTotalCategories,
  dateFilter,
}: CategoryManagementProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [totalCategories, setTotalCategories] = useState(
    initialTotalCategories
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "productCount" | "updatedAt">(
    "updatedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { categories: fetchedCategories, totalCategories: total } =
          await getCategories(page, rowsPerPage);
        const mappedCategories = fetchedCategories.map((cat) => ({
          ...cat,
          slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          productCount: cat.products.length,
          seoMetaTitle: cat.title,
          seoMetaDescription: cat.description,
          createdAt:
            cat.createdAt instanceof Date
              ? cat.createdAt.toISOString()
              : cat.createdAt || "",
          updatedAt:
            cat.updatedAt instanceof Date
              ? cat.updatedAt.toISOString()
              : cat.updatedAt || "",
        }));

        const filteredCategories = searchQuery
          ? mappedCategories.filter(
              (cat) =>
                cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cat.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
          : mappedCategories;

        setCategories(filteredCategories);
        setTotalCategories(total);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [page, rowsPerPage, searchQuery]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories(categories.map((category) => category.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleEdit = (category: Category) => {
    setIsEditing(category.id);
    setEditForm(category);
  };

  const handleSave = async () => {
    if (!isEditing || !editForm.id) return;
    setLoading(true);
    try {
      const updatedCategory = await categoryUpdate(editForm.id, {
        name: editForm.name,
        description: editForm.description,
        title: editForm.seoMetaTitle,
        url: editForm.url || "",
        status: editForm.status || "ACTIVE",
      });

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === updatedCategory.id
            ? {
                ...updatedCategory,
                slug: editForm.slug || generateSlug(updatedCategory.name),
                productCount: updatedCategory.products.length,
                seoMetaTitle: updatedCategory.title,
                seoMetaDescription: updatedCategory.description,
                createdAt:
                  updatedCategory.createdAt instanceof Date
                    ? updatedCategory.createdAt.toISOString()
                    : updatedCategory.createdAt || "",
                updatedAt:
                  updatedCategory.updatedAt instanceof Date
                    ? updatedCategory.updatedAt.toISOString()
                    : updatedCategory.updatedAt || "",
              }
            : cat
        )
      );
      toast("Category updated successfully!");
      setIsEditing(null);
      setEditForm({});
    } catch (error) {
      console.error("Error updating category:", error);
      toast("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (sortBy === "productCount") {
      return sortOrder === "asc"
        ? (a.productCount || 0) - (b.productCount || 0)
        : (b.productCount || 0) - (a.productCount || 0);
    } else if (sortBy === "name") {
      const val1 = a.name || "";
      const val2 = b.name || "";
      return sortOrder === "asc"
        ? val1.localeCompare(val2)
        : val2.localeCompare(val1);
    } else if (sortBy === "updatedAt") {
      const val1 =
        a.updatedAt instanceof Date
          ? a.updatedAt.toISOString()
          : a.updatedAt || "";
      const val2 =
        b.updatedAt instanceof Date
          ? b.updatedAt.toISOString()
          : b.updatedAt || "";
      return sortOrder === "asc"
        ? val1.localeCompare(val2)
        : val2.localeCompare(val1);
    }
    return 0;
  });

  const totalPages = Math.ceil(totalCategories / rowsPerPage);

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
        <h2 className="text-xl font-semibold">Category Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent text-black"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "productCount" | "updatedAt")
            }
          >
            <option value="name">Sort by Name</option>
            <option value="productCount">Sort by Products</option>
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

      {selectedCategories.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedCategories.length} categories selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <MoveRight className="w-4 h-4" />
              <span>Merge</span>
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
                  checked={selectedCategories.length === categories.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
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
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : sortedCategories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              sortedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleSelectCategory(category.id)}
                      className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === category.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
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
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {category.description}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {isEditing === category.id ? (
                      <input
                        type="text"
                        value={
                          editForm.slug || generateSlug(editForm.name || "")
                        }
                        onChange={(e) =>
                          setEditForm({ ...editForm, slug: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
                      />
                    ) : (
                      category.slug || generateSlug(category.name)
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.productCount || category.products.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.updatedAt instanceof Date
                      ? category.updatedAt.toLocaleString()
                      : category.updatedAt
                      ? new Date(category.updatedAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {isEditing === category.id ? (
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
                            onClick={() => handleEdit(category)}
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
          {Math.min((page + 1) * rowsPerPage, totalCategories)} of{" "}
          {totalCategories} categories
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

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
