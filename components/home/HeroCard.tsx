import React from "react";

interface HeroCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  rating?: number;
  reviews?: number;
  price?: string;
  fullDetails?: boolean;
}

const HeroCard: React.FC<HeroCardProps> = ({
  imageUrl,
  title,
  subtitle,
  rating,
  reviews,
  price,
  fullDetails = true,
}) => {
  return (
    <div
      className={`overflow-hidden relative w-full rounded-xl aspect-[16/9] ${
        fullDetails ? "h-[316px]" : "h-[100px]"
      }`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      {fullDetails ? (
        <>
          <div className="absolute top-5 left-5 p-2 text-sm text-white bg-red-700 rounded-md">
            {"#1 selling activity"}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="mb-4 text-2xl font-semibold text-white max-sm:text-2xl">
              <span>{title}</span>
              <br />
              <span>{subtitle}</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <i className="ti ti-star text-yellow-500" />
              <span className="text-lg text-white">{rating}</span>
              <span className="text-lg text-neutral-500">
                ({reviews} reviews)
              </span>
            </div>
            <div className="absolute top-5 right-5 text-right">
              <div className="text-lg font-medium text-stone-300">from</div>
              <div className="text-2xl font-semibold text-white max-sm:text-2xl">
                {price}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className={`font-semibold text-white`}>{title}</p>
        </div>
      )}
    </div>
  );
};

export default HeroCard;
