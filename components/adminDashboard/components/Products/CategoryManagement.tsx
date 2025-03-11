import React, { useState } from "react";
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

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Development Tools",
    description: "Tools for software development and programming",
    slug: "development-tools",
    productCount: 156,
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-02-15T10:00:00Z",
    seoMetaTitle: "Best Development Tools | LaunchPad",
    seoMetaDescription:
      "Discover the best development tools for your next project",
  },
  {
    id: "2",
    name: "Design Tools",
    description: "Tools for graphic design and UI/UX",
    slug: "design-tools",
    productCount: 98,
    createdAt: "2024-02-14T15:30:00Z",
    updatedAt: "2024-02-14T15:30:00Z",
    seoMetaTitle: "Design Tools | LaunchPad",
    seoMetaDescription:
      "Find the perfect design tools for your creative workflow",
  },
  {
    id: "3",
    name: "Marketing",
    description: "Marketing and promotion tools",
    slug: "marketing",
    productCount: 124,
    createdAt: "2024-02-13T09:15:00Z",
    updatedAt: "2024-02-13T09:15:00Z",
    seoMetaTitle: "Marketing Tools | LaunchPad",
    seoMetaDescription: "Explore marketing tools to grow your business",
  },
];

export default function CategoryManagement({
  dateFilter,
}: {
  dateFilter: string;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "productCount" | "updatedAt">(
    "updatedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories(mockCategories.map((category) => category.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleEdit = (category: Category) => {
    setIsEditing(category.id);
    setEditForm(category);
  };

  const handleSave = () => {
    // Save changes to backend
    setIsEditing(null);
    setEditForm({});
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleCreateCategory = (category: {
    name: string;
    description: string;
    slug: string;
  }) => {
    // Here you would normally make an API call to create the category
    console.log("Creating category:", category);
  };

  const filteredCategories = mockCategories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "productCount") {
        return sortOrder === "asc"
          ? a.productCount - b.productCount
          : b.productCount - a.productCount;
      }
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === "asc"
          ? val1.localeCompare(val2)
          : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">
          Category Management
        </h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
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

      {/* Bulk Actions */}
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

      {/* Categories Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === mockCategories.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Slug
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Products
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category) => (
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
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                      />
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
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
                      value={editForm.slug || generateSlug(editForm.name || "")}
                      onChange={(e) =>
                        setEditForm({ ...editForm, slug: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    />
                  ) : (
                    category.slug
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.productCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(category.updatedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {isEditing === category.id ? (
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-700"
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
            ))}
          </tbody>
        </table>
      </div>

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
