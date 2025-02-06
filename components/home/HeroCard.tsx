import Image from "next/image";
import React from "react";

interface HeroCardProps {
  imageUrl: string;
  title: string;
  headline?: string;

  price?: string;
  fullDetails?: boolean;
}

const HeroCard: React.FC<HeroCardProps> = ({
  imageUrl,
  title,
  headline,

  price,
  fullDetails = true,
}) => {
  return (
    <div
      className={`rounded-xl shadow-lg bg-[#ffffff] text-gray-600 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f3f4f6] ${
        fullDetails ? "h-[200px]" : "h-[100px]"
      }`}
    >
      <div className="pt-2 rounded-lg">
        <div className="px-5 py-2">
          <div className="flex items-center">
            <div>
              <Image
                src={imageUrl}
                alt="logo"
                width={1000}
                height={1000}
                className={`h-10 w-10 rounded-md ${
                  fullDetails ? "h-[100px] w-[100px]" : "h-[10]"
                }`}
              />
            </div>
            <p className="font-bold text-md ms-4 mt-2 text-black">{title}</p>
          </div>
          <div className="flex justify-between">
            <p className="mt-3 text-[14px] text-gray-700">
              {headline!.slice(0, 120)}...
            </p>
            <button
              className={`bg-slate-950 hover:bg-indigo-800 rounded-md text-white font-medium text-lg text-center no-underline ${
                fullDetails ? "w-[140px] " : "w-[110px] h-[30px]"
              }`}
            >
              <span className={`${fullDetails ? "text-[9px]" : "text-[8px] "}`}>
                Visit {title.slice(0, 15)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
