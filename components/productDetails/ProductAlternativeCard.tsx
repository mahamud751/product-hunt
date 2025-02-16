"use client";
import Image from "next/image";
import React from "react";

import { Product } from "@/services/types";

const ProductAlternativeCard = ({
  currentProduct,
}: {
  currentProduct: Product;
}) => {
  console.log("currentProduct", currentProduct);

  return (
    <div className="grid grid-cols-3 gap-3 mt-2">
      {Array.isArray(currentProduct?.alternatives) &&
        currentProduct?.alternatives?.map((product: Product) => {
          return (
            <div
              key={product.id}
              className="flex flex-col items-start px-2 py-1 col-span-1  duration-300 rounded-lg 
          border border-solid bg-neutral-50 border-neutral-200 transition-transform transform hover:shadow-md hover:border-neutral-300 hover:scale-15"
            >
              <div className="flex gap-2 justify-between items-center w-full max-sm:gap-3">
                <div className="flex gap-3 tracking-tight leading-snug mt-2">
                  <div>
                    <button className="box-border flex flex-col p-1 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
                      <Image
                        src={product?.logo || "/default-logo.png"}
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="object-contain w-9 h-9 rounded aspect-square"
                      />
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between w-full items-center">
                      <p className="text-gray-500 text-xs md:text-sm pr-2 mt-3 mb-2 w-44 truncate">
                        {product?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductAlternativeCard;
