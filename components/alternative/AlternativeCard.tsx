import Image from "next/image";
import React from "react";

const AlternativeCard = ({ data }: { data: any }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-start px-5 py-4 rounded-lg border border-solid bg-neutral-50 border-neutral-200">
        <div className="flex gap-3 text-xl font-semibold tracking-tight leading-snug whitespace-nowrap text-neutral-800">
          <button className="box-border flex flex-col justify-center items-center p-1.5 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
            <Image
              src={data?.logo}
              alt="logo"
              width={1000}
              height={1000}
              className="object-contain w-9 h-9 rounded aspect-square max-md:h-[22px] max-md:w-[22px] max-sm:w-5 max-sm:h-5"
            />
          </button>
          <div className="my-auto">{data?.name}</div>
        </div>
        <div className="self-stretch mt-5 text-sm leading-5 text-neutral-600 h-[32px]">
          {data.description.slice(0, 75)}...
        </div>
        <div className="mt-6 text-xs leading-none text-stone-500">
          16 alternatives
        </div>
      </div>
    </div>
  );
};

export default AlternativeCard;
