"use client";
import { createCategory } from "@/lib/server-actions";
import React, { useState } from "react";
import { toast } from "sonner";

const NewCategory = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      await createCategory({
        name,
        url,
        title,
        description,
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
        <h1 className="text-4xl font-semibold"> New Category</h1>

        <div className="mt-10">
          <h2 className="font-medium">Name of the Category</h2>
          <input
            type="text"
            value={name}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleName}
            placeholder="Simply the name of the category"
          />
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

export default NewCategory;
