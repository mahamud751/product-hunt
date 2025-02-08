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
  fullDetails = true,
}) => {
  return (
    <div
      className={`rounded-xl shadow-lg bg-[#ffffff] text-gray-600 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-[#f9fafb] hover:to-[#f3f4f6] ${
        fullDetails ? "h-[240px]" : "h-[115px]"
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
                className={`rounded-md ${
                  fullDetails ? "h-[60px] w-[60px]" : "h-[30px] w-[30px]"
                }`}
              />
            </div>

            <p
              className={`font-semibold ms-4 text-neutral-800 ${
                fullDetails ? "text-[16px]" : "text-[16px]"
              }`}
            >
              {!fullDetails ? title?.slice(0, 10) : title!}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className={`text-[12px] text-gray-700   ${
                fullDetails ? "mt-5" : "mt-1"
              }`}
            >
              {!fullDetails ? headline?.slice(0, 20) : headline!}
            </p>
          </div>
          <button
            className={`bg-orange-800 hover:bg-orange-700 rounded-md text-white font-medium text-lg text-center no-underline ${
              fullDetails ? "w-[100%] mt-5 h-10" : "w-[100%] mt-1"
            }`}
          >
            <span className="text-[12px]">Try it Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
