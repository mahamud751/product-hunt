import Image from "next/image";
import React from "react";

const PromoButtonCard = () => {
  return (
    <div>
      <div className="flex flex-col items-start mt-5 px-5 pb-5 text-sm rounded-lg border border-solid bg-neutral-50 border-neutral-200  text-neutral-600">
        <div className="flex gap-3 mt-2.5 text-xl font-semibold tracking-tight leading-snug text-neutral-800">
          <button className="box-border flex flex-col justify-center items-center p-1 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
            <Image
              src={
                "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="logo"
              width={1000}
              height={1000}
              className="object-contain w-9 h-9 rounded aspect-square"
            />
          </button>

          <div className="my-auto basis-auto">Discover our Marketplace</div>
        </div>
        <div className="mt-1 leading-5">
          Find exlusive deals on carefully curated tools and resource for
          founders.
        </div>
        <div className="flex gap-5 justify-center self-stretch px-4 py-3 mt-2 font-medium leading-none text-white rounded-lg bg-neutral-800">
          <div className="my-auto">Browse All Deals</div>
        </div>
      </div>
    </div>
  );
};

export default PromoButtonCard;
