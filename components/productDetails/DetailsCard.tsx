import { Product } from "@/services/types";
import Image from "next/image";
import React from "react";

const DetailsCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex p-6 gap-4 mx-auto my-0 bg-white max-w-[868px] max-md:p-5 max-sm:flex-col max-sm:p-4">
      <button className="box-border flex flex-col justify-center items-center p-1 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
        <Image
          src={product?.logo ?? ""}
          alt="logo"
          width={1000}
          height={1000}
          className="object-contain w-9 h-9 rounded aspect-square"
        />
      </button>

      <div className="flex-1">
        <div className="flex flex-wrap gap-5 justify-between items-start mb-3.5 max-md:gap-4 max-sm:flex-col">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold leading-none text-black">
              {product?.name}
            </div>
            <div className="text-lg leading-loose text-black">
              {product?.headline?.slice(0, 25)}
            </div>
          </div>
          <div className="flex gap-3 items-center max-sm:flex-wrap">
            {/* {badgeUrls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`Badge ${index + 1}`}
        className="object-contain h-9 w-[33px]"
      />
    ))} */}
            <a
              href="#"
              className="px-5 py-0 h-12 text-base font-bold text-black no-underline bg-white rounded-full border-2 border-gray-200 border-solid max-sm:w-full"
            >
              Visit website
            </a>
            <button className="px-5 py-0 h-12 text-base font-bold text-black bg-red-400 rounded-full border-2 border-red-400 border-solid cursor-pointer max-sm:w-full">
              Follow
            </button>
          </div>
        </div>
        {/* <div className="flex gap-2 items-center">
            <StarRating rating={rating} />
            <ProfileStats
              reviews={reviews}
              shoutouts={shoutouts}
              followers={followers}
            />
          </div> */}
      </div>
    </div>
  );
};

export default DetailsCard;
