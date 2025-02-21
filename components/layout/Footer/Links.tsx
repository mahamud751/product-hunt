import Link from "next/link";
import React from "react";

interface LinkColumnProps {
  title: string;
  data: { label: string; href: string }[]; // Define the structure of the data array
}

const LinkColumn: React.FC<LinkColumnProps> = ({ title, data }) => {
  return (
    <div className="flex flex-col w-[33%] max-sm:mt-8 max-sm:w-full">
      <div className="flex flex-col items-start text-sm leading-none text-stone-500 max-md:mt-10">
        <h3 className="font-medium text-neutral-800">{title}</h3>
        {data.map((pd, index) => (
          <Link key={index} href={pd.href} className="mt-4 cursor-pointer">
            {pd.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinkColumn;
