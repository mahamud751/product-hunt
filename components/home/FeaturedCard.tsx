import Image from "next/image";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
const FeaturedCard = () => {
  return (
    <div className="rounded-xl shadow-xl  text-gray-600 mt-10">
      <div className="pt-4 rounded-lg relative">
        <span className="pricing absolute top-[-20px] left-5 bg-blue-200 rounded-sm flex items-center px-3 py-2 text-lg font-semibold text-blue-700">
          Ad
        </span>
        <div className="p-5">
          <div className="flex">
            <div>
              <Image
                src={
                  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                }
                alt="logo"
                width={1000}
                height={1000}
                className="h-12 w-12 rounded-md"
              />
            </div>
            <p className="font-bold text-lg ms-4 mt-2">Efficient App</p>
          </div>
          <p className="mt-2 text-sm">
            Not all Open Source alternatives are equal -- Narrow down the best,
            without the bulish&apos;t
          </p>

          <div className="mt-2 w-full">
            <button className="flex justify-between px-10 button w-full bg-slate-950 hover:bg-indigo-800 rounded-md text-white font-medium text-lg text-center py-3 no-underline">
              <span className="text-sm"> Visit Efficient App</span>
              <ArrowOutwardIcon sx={{ fontSize: 14 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
