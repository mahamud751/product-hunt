"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getProducts } from "@/lib/server-actions";

const ProductFeaturedCard = () => {
  const [featured, setFeatured] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        const data = await getProducts(0, 10, "ACTIVE", true);
        setFeatured(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-2">
      <div className="">
        {featured?.products?.map((product: any, index: number) => (
          <div
            key={product.id}
            className="flex flex-col items-start px-2 py-1 col-span-4 transition-all duration-300"
          >
            <div className="flex gap-2 justify-between items-center self-stretch w-full max-sm:gap-3">
              <div className="flex gap-3 items-center tracking-tight leading-snug whitespace-nowrap">
                <button className="box-border flex flex-col justify-center items-center p-0.5 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
                  <Image
                    src={product?.logo || "/default-image.jpg"}
                    alt={product?.name}
                    width={1000}
                    height={1000}
                    className="object-contain w-9 h-9 rounded aspect-square"
                  />
                </button>

                <div>
                  <h1 className="text-sm font-semibold">{product?.name}</h1>
                  <p className="text-gray-500 text-xs md:text-sm pr-2">
                    {product?.headline.slice(0, 20)}
                  </p>
                </div>
              </div>
            </div>
            <hr className="w-full mt-4 border-t border-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeaturedCard;
