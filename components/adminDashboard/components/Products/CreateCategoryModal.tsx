"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { createCategory } from "@/lib/server-actions";
import { toast } from "sonner";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({
  isOpen,
  onClose,
}: CreateCategoryModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate slug from name (optional, retained from previous modal)
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Call the server action to create the category with all fields
      await createCategory({
        name,
        url,
        title,
        description,
      });

      toast("Category created successfully!");
      setName("");
      setUrl("");
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      console.log(error);
      toast("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#1F1F1F]">
            Create New Category
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
              placeholder="Simply the name of the category"
              required
            />
          </div>

          <div>
            <label
              htmlFor="url"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
              placeholder="http://example.com"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
              placeholder="Simply the title of the category"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] text-black"
              placeholder="Simply the description of the category"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-[#AF583B] text-white rounded-lg text-sm hover:bg-[#8E4730] transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
