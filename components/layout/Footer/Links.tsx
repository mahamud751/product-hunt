import React from "react";

interface LinkColumnProps {
  title: string;
  links: string[];
}

const LinkColumn: React.FC<LinkColumnProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col w-[33%] max-sm:mt-8 max-sm:w-full">
      <div className="flex flex-col items-start text-sm leading-none text-stone-500 max-md:mt-10">
        <h3 className="font-medium text-neutral-800">{title}</h3>
        {links.map((link, index) => (
          <a key={index} href="#" className="mt-4 cursor-pointer">
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkColumn;
