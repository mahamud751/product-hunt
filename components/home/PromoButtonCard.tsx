import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Link from "next/link";
const PromoButtonCard = () => {
  return (
    <Link href="/promos">
      <div className="flex flex-col items-start mt-5 px-5 pb-5 text-sm rounded-lg border border-solid bg-neutral-50 border-neutral-200  text-neutral-600">
        <div className="flex gap-5 justify-center  self-stretch px-4 py-3 mt-5 font-medium leading-none text-white rounded-lg bg-neutral-800">
          <div className="my-auto">Browse All Deals</div>
          <ArrowOutwardIcon sx={{ fontSize: 14 }} />
        </div>
      </div>
    </Link>
  );
};

export default PromoButtonCard;
