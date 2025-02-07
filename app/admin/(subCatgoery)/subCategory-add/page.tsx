"use client";
import { createSubCategory, getActiveCategory } from "@/lib/server-actions";
import { Category } from "@/services/types";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const NewSubCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getActiveCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handleUrl = (e: any) => {
    setUrl(e.target.value);
  };
  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const submitProduct = async () => {
    setLoading(true);

    try {
      await createSubCategory({
        name,
        url,
        title,
        description,
        categoryId: categoryId!,
      });
      toast("Category created successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-8 md:py-20">
      <div className="px-8 w-full md:w-2/5 ms-20">
        <h1 className="text-4xl font-semibold"> New Sub Category</h1>

        <div className="mt-10">
          <h2 className="font-medium">Name of the Sub Category</h2>
          <input
            type="text"
            value={name}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleName}
            placeholder="Simply the name of the category"
          />
        </div>
        <div className="mt-10">
          <h2 className="font-medium">Select Category</h2>
          <div className="pt-4">
            <Autocomplete
              options={categories?.map((category) => ({
                label: category.name,
                id: category.id,
              }))}
              value={
                selectedCategory
                  ? { label: selectedCategory, id: categories.toString() }
                  : null
              }
              onChange={(event, newValue) => {
                if (newValue && typeof newValue === "object") {
                  setSelectedCategory(newValue.label);
                  setCategoryId(newValue?.id ?? null);
                } else {
                  setSelectedCategory(null);
                  setCategoryId(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Search Categories"
                  fullWidth
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-medium">Url</h2>
          <input
            type="text"
            value={url}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleUrl}
            placeholder="http://example.com"
          />
        </div>
        <div className="mt-10">
          <h2 className="font-medium">Title</h2>
          <input
            type="text"
            value={title}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleTitle}
            placeholder="Simply the title of the category"
          />
        </div>
        <div className="mt-10">
          <h2 className="font-medium">Description</h2>
          <textarea
            rows={8}
            value={description}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleDescription}
            placeholder="Simply the description of the category"
          />
        </div>
        <button
          onClick={submitProduct}
          className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4 items-end"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewSubCategory;
