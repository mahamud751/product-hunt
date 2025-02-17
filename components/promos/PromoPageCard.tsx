import { Product } from "@/services/types";
import Image from "next/image";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
interface BadgeProps {
  text: string;
  variant?: "default" | "discount";
}

const Badge: React.FC<BadgeProps> = ({ text, variant = "default" }) => {
  const baseClasses = "px-2 py-1 text-xs rounded-md";
  const variantClasses = {
    default: "text-gray-500 bg-gray-50 border border-solid border-slate-200",
    discount: "text-white bg-violet-500 shadow-[0px_1px_3px_rgba(0,0,0,0.1)]",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>{text}</div>
  );
};

interface PriceInfoProps {
  discount: string;
  originalPrice: string;
}

const PriceInfo: React.FC<PriceInfoProps> = ({ discount, originalPrice }) => {
  return (
    <div className="flex gap-3 mt-4 whitespace-nowrap">
      <div className="text-sm font-medium leading-none text-gray-800">
        ${discount}
      </div>
      <div className="text-xs leading-none text-gray-400">${originalPrice}</div>
    </div>
  );
};

interface CouponSectionProps {
  couponCode: string;
}

const CouponSection: React.FC<CouponSectionProps> = ({ couponCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy coupon code", err);
    }
  };

  return (
    <div className="flex gap-5 justify-between self-stretch mt-2 text-xs leading-none text-gray-800">
      <div className="overflow-hidden px-2.5 py-1.5 my-auto whitespace-nowrap bg-gray-100 rounded">
        {couponCode}
      </div>
      <button
        onClick={handleCopy}
        className="flex gap-1.5 px-3.5 py-1.5 font-light text-center bg-white rounded-md border border-solid"
      >
        <span>{copied ? "Copied!" : "Use Coupon"}</span>
      </button>
    </div>
  );
};

interface MarketSeerCardProps {
  data: Product;
}

export const PromoPageCard: React.FC<MarketSeerCardProps> = ({ data }) => {
  const promoPrice = (
    parseFloat(data?.price) *
    (1 - parseFloat(data?.promoOffer || "0") / 100)
  ).toFixed(2);

  return (
    <div className="flex flex-col items-start px-5 py-4 rounded-lg border border-solid bg-neutral-50 border-neutral-200">
      <div className="flex gap-5 justify-between self-stretch w-full font-semibold">
        <button className="box-border flex flex-col p-1 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
          <Image
            src={data?.logo ?? ""}
            alt="logo"
            width={1000}
            height={1000}
            className="object-contain w-9 h-9 rounded aspect-square"
          />
        </button>
        <div className="flex gap-1.5 self-start">
          <Badge text={`${data?.category?.name.slice(0, 12)}` || "Category"} />
          <Badge text={`${data?.promoOffer}% OFF` || "0"} variant="discount" />
        </div>
      </div>

      <div className="flex gap-2 mt-3.5 text-sm font-medium leading-none text-black">
        <div className="grow my-auto">{data?.name}</div>
        <StarIcon fontSize="small" />
      </div>
      <div className="mt-2.5 text-xs leading-none text-gray-500">
        {data?.headline?.slice(0, 35) || "No description available"}
      </div>

      <PriceInfo discount={promoPrice} originalPrice={data?.price || "0"} />
      <CouponSection
        couponCode={data?.promoCode?.slice(0, 20) || "No Coupon"}
      />
    </div>
  );
};
