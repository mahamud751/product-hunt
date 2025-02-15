"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AlertColor } from "@mui/material";
import { getFeaturedProducts } from "@/lib/server-actions";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const FeaturedCardData = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getFeaturedProducts().then((data) => {
      setData(data.slice(0, 5));
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 mt-2">
      {data?.map((product) => {
        const promoPrice = (
          parseFloat(product?.price) *
          (1 - parseFloat(product?.promoOffer || "0") / 100)
        ).toFixed(0);
        return (
          <div
            key={product.id}
            className="flex flex-col items-start px-2 py-1 col-span-4  duration-300 rounded-lg 
    border border-solid bg-neutral-50 border-neutral-200 transition-transform transform hover:shadow-md hover:border-neutral-300 hover:scale-15
    "
          >
            <div className="flex gap-2 justify-between items-center w-full max-sm:gap-3">
              <div className="flex gap-3 tracking-tight leading-snug mt-2">
                <div>
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

                <div>
                  <h1 className="text-sm font-semibold">
                    {product?.name.slice(0, 15)}
                  </h1>

                  <p className="text-gray-500 text-xs md:text-sm pr-2">
                    {product?.headline.slice(0, 70)}...
                  </p>

                  <div className="flex justify-between w-full items-center">
                    <p className="text-gray-500 text-xs md:text-sm pr-2 mt-3 mb-2 w-44 truncate">
                      {product?.category?.name}
                    </p>

                    <button className="flex py-2 text-sm font-medium text-neutral-600 w-12">
                      <span className="grow">View</span>
                      <Image
                        src="/images/SVG.png"
                        alt="alternatives"
                        className="object-contain shrink-0 aspect-[1.07] w-[15px]"
                        width={200}
                        height={200}
                      />
                    </button>
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

export default FeaturedCardData;
