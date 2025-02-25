import React, { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Product } from "@/services/types";
import Image from "next/image";
import { cleanName } from "@/lib/utils";
import Link from "next/link";

interface MarketSeerCardProps {
  data: Product;
}
export const DealCard: React.FC<MarketSeerCardProps> = ({ data }) => {
  const cleanedName = cleanName(data?.name ?? "");
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.promoOffer ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const promoPrice = (
    parseFloat(data?.price) *
    (1 - parseFloat(data?.promoOffer || "0") / 100)
  ).toFixed(2);
  return (
    <Link
      href={{
        pathname: `/productDetails/${encodeURIComponent(cleanedName)}`,
        query: { id: data?.id },
      }}
    >
      <div className="bg-[#F5F5F5] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 p-1 bg-[#F5F5F5] border border-gray-200 rounded-md flex-shrink-0">
            <Image
              src={data?.logo ?? ""}
              alt="logo"
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1F1F1F] truncate">{data?.name}</h3>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs font-medium text-white bg-[#198E49] px-2 py-1 rounded-[5px] hover:bg-[#198E49]/90 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>{data?.promoOffer}% Off</span>
              </>
            )}
          </button>
        </div>

        <div className="h-[40px] mb-4">
          <p className="text-sm text-[#1F1F1F]/80 line-clamp-2">
            {data?.headline}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="space-y-1">
            <span className="text-xs text-[#1F1F1F]/60 block">
              {data?.category?.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="line-through text-sm text-[#1F1F1F]/60">
                ${data?.price}
              </span>
              <span className="font-bold text-[#1F1F1F]">${promoPrice}</span>
            </div>
          </div>
          <button
            className="group relative p-2 rounded-full hover:bg-[#AF583B]/10 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`absolute right-0 bottom-full mb-1 whitespace-nowrap bg-[#1F1F1F] text-white text-xs px-2 py-1 rounded transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Grab Now
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#AF583B] transition-transform group-hover:translate-y-[-2px]" />
          </button>
        </div>
      </div>
    </Link>
  );
};
