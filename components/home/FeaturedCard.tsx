import Image from "next/image";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
const FeaturedCard = () => {
  return (
    <div className="flex flex-col items-start mt-5 px-5 pb-5 text-sm rounded-lg border border-solid bg-neutral-50 border-neutral-200  text-neutral-600">
      <div className="p-2 text-xs leading-none whitespace-nowrap bg-white rounded border border-solid border-neutral-200 mt-[-14px]">
        Ad
      </div>
      <div className="flex gap-3 mt-2.5 text-xl font-semibold tracking-tight leading-snug text-neutral-800">
        <Image
          loading="lazy"
          src={
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
          }
          className="object-contain shrink-0 w-9 rounded-md aspect-square"
          alt="Efficient App logo"
          width={1000}
          height={1000}
        />
        <div className="my-auto basis-auto">Efficient App</div>
      </div>
      <div className="mt-5 leading-5">
        Not all Open Source alternatives are equal — Narrow down the best,
        without the bullsh*t
      </div>
      <div className="flex gap-5 justify-between self-stretch px-4 py-3 mt-7 font-medium leading-none text-white rounded-lg bg-neutral-800">
        <div className="my-auto">Visit Efficient App</div>
        <ArrowOutwardIcon sx={{ fontSize: 14 }} />
      </div>
    </div>
  );
};

export default FeaturedCard;
