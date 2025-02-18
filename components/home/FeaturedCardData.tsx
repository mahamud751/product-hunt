"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getFeaturedProducts } from "@/lib/server-actions";

const FeaturedCardData = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getFeaturedProducts().then((data) => {
      setData(data.slice(0, 5));
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 mt-3">
      {data?.map((product) => {
        return (
          <div
            key={product.id}
            className="flex gap-3 px-2 py-1 col-span-4  duration-300 rounded-lg 
          border border-solid bg-neutral-50 border-neutral-200 transition-transform transform hover:shadow-md hover:border-neutral-300 hover:scale-15
         "
          >
            {/* Left side for Image */}
            <div className="mt-1">
              <button className="box-border flex flex-col p-1 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
                <Image
                  src={product?.logo}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="object-contain w-9 h-9 rounded aspect-square"
                />
              </button>
            </div>

            {/* Right side for all details */}
            <div className="flex flex-col justify-between flex-grow px-1">
              <div className="flex justify-between items-center">
                <h1 className="text-sm font-semibold">
                  {product?.name.slice(0, 15)}
                </h1>
              </div>

              <p className="text-gray-500 text-xs mt-1 mb-2">
                {product?.headline.slice(0, 32)}...
              </p>

              <div className="flex justify-between">
                <p className="text-gray-500 text-xs">
                  {product?.category?.name.slice(0, 10)}
                </p>
                <div className="flex">
                  <button className="flex text-neutral-600 w-12 mt-[-1px]">
                    <span className="text-[12px]">Visit</span>
                    <div className="m-[2px]">
                      <Image
                        src="/images/SVG.png"
                        alt="alternatives"
                        className="object-contain shrink-0 aspect-[1.07] w-[15px]"
                        width={200}
                        height={200}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedCardData;
