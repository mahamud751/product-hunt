"use client";
import { createAlternative } from "@/lib/server-actions";
import React, { useState } from "react";
import { toast } from "sonner";

const NewCategory = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const submitProduct = async () => {
    setLoading(true);

    try {
      await createAlternative(name);
      toast("Alternative created successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-8 md:py-20">
      <div className="px-8 w-full md:w-2/5 ms-20">
        <h1 className="text-4xl font-semibold"> New Alternative</h1>

        <div className="mt-10">
          <h2 className="font-medium">Name of the Alternative</h2>
          <input
            type="text"
            value={name}
            maxLength={30}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleName}
            placeholder="Simply the name of the product"
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
