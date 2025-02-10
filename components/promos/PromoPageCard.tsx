import { Product } from "@/services/types";

interface BadgeProps {
  text: string;
  variant?: "default" | "discount";
}

const Badge: React.FC<BadgeProps> = ({ text, variant = "default" }) => {
  const baseClasses = "px-3 py-1.5 text-xs rounded-md";
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
        {discount}
      </div>
      <div className="text-xs leading-none text-gray-400">{originalPrice}</div>
    </div>
  );
};

interface CouponSectionProps {
  couponCode: string;
}

const CouponSection: React.FC<CouponSectionProps> = ({ couponCode }) => {
  return (
    <div className="flex gap-5 justify-between self-stretch mt-2 text-xs leading-none text-gray-800">
      <div className="overflow-hidden px-2.5 py-1.5 my-auto whitespace-nowrap bg-gray-100 rounded">
        {couponCode}
      </div>
      <button className="flex gap-1.5 px-3.5 py-1.5 font-light text-center bg-white rounded-md border border-solid">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f823f8adf51d0feee4675d0c9db1656f686cd70297a60967bc6cc5167b4751b2?placeholderIfAbsent=true&apiKey=e4c55b3835e0471b869cabb50a0b8cd9"
          alt=""
          className="object-contain shrink-0 w-3 aspect-square"
        />
        <span>Use Coupon</span>
      </button>
    </div>
  );
};

interface MarketSeerCardProps {
  data: Product[];
}

export const PromoPageCard = ({ data }) => {
  return (
    <div className="flex flex-col items-start px-5 py-4 rounded-lg border border-solid bg-neutral-50 border-neutral-200">
      <div className="flex gap-5 justify-between self-stretch w-full font-semibold">
        <img
          loading="lazy"
          src={data?.logo}
          alt="Market Seer logo"
          className="object-contain shrink-0 w-8 rounded aspect-square"
        />
        <div className="flex gap-1.5 self-start">
          <Badge text={data?.category?.name} />
          <Badge text={data.dis} variant="discount" />
        </div>
      </div>
      <div className="flex gap-2 mt-3.5 text-sm font-medium leading-none text-black">
        <div className="grow my-auto">{data.name}</div>
        <img
          loading="lazy"
          src={data?.logo}
          alt=""
          className="object-contain shrink-0 w-4 aspect-square"
        />
      </div>
      <div className="mt-2.5 text-xs leading-none text-gray-500">
        {data?.headline}
      </div>
      <PriceInfo discount={data?.promoOffer} originalPrice={data?.price} />
      <CouponSection couponCode={data?.promoCode} />
    </div>
  );
};
