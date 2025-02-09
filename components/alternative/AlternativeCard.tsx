import React from "react";

const AlternativeCard = () => {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-start px-5 py-4 rounded-lg border border-solid bg-neutral-50 border-neutral-200 max-w-[307px]">
        <div className="flex gap-3 text-xl font-semibold tracking-tight leading-snug whitespace-nowrap text-neutral-800">
          <img
            loading="lazy"
            src={
              "https://cdn.builder.io/api/v1/image/assets/TEMP/d3c96baf1a9156d9e9177c49da40e64b0c2def4b47d217ea16e3890c6cdadb1b?placeholderIfAbsent=true&apiKey=e4c55b3835e0471b869cabb50a0b8cd9"
            }
            alt={` icon`}
            className="object-contain shrink-0 w-9 rounded-md aspect-square"
          />
          <div className="my-auto">Notion</div>
        </div>
        <div className="self-stretch mt-5 text-sm leading-5 text-neutral-600">
          An all-in-one workspace for note-taking, project management, knowledge
        </div>
        <div className="mt-6 text-xs leading-none text-stone-500">
          16 alternatives
        </div>
      </div>
    </div>
  );
};

export default AlternativeCard;
