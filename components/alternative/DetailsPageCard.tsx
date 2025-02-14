import Image from "next/image";
import React from "react";

interface NotionCardProps {
  alternative: any;
}

const DetailsPageCard: React.FC<NotionCardProps> = ({ alternative }) => {
  return (
    <div className="flex flex-col items-start p-5 text-sm rounded-lg border border-solid bg-neutral-50 border-neutral-200">
      <div className="flex gap-3 text-xl font-semibold tracking-tight leading-snug whitespace-nowrap text-stone-900">
        <Image
          loading="lazy"
          src={alternative?.logo}
          alt={`${alternative?.name} logo`}
          className="object-contain shrink-0 w-9 rounded-md aspect-square"
          width={200}
          height={200}
        />
        <div className="my-auto">{alternative?.name}</div>
      </div>
      <div className="mt-5 leading-5 text-neutral-600">
        {alternative?.description.slice(0, 75)}...
      </div>
      <button className="flex gap-5 justify-between self-stretch px-4 py-2.5 mt-6 font-medium leading-none text-white rounded-lg bg-stone-900 w-full">
        <span className="my-auto">Visit {alternative?.name}</span>
        <Image
          loading="lazy"
          src="/images/SVG2.png"
          alt=""
          className="object-contain shrink-0 aspect-square w-[15px]"
          width={200}
          height={200}
        />
      </button>
    </div>
  );
};

export default DetailsPageCard;
