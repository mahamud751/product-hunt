"use client";
import React from "react";
import SocialIcons from "./SocialIcon";
import NewsletterForm from "./NewsLetter";
import LinkColumn from "./Links";
import AuthorCredit from "./Authors";
import { Container } from "@mui/material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const linkColumns = [
    {
      title: "Browse:",
      links: [
        "Alternatives",
        "All Categories",
        "AI & Assistants",
        "Work & Productivity",
        "Marketing & Sales",
        "Social Meida Tools",
      ],
    },
    {
      title: "Quick Links:",
      links: [
        "About Us",
        "Our Blog",
        "Advertise",
        "Add a Free Listing",
        "Auto Submit",
        "Privacy Policy",
        "Terms & Condtion",
      ],
    },
    {
      title: "Platforms:",
      links: [
        "Leaderboard",
        "Community",
        "Winner Borad",
        "How it Works",
        "Newsletter",
        "Become An Affiliate",
      ],
    },
  ];

  return (
    <footer className="pt-14 my-0 border-t border-neutral-800 border-opacity-10 max-sm:py-8">
      <div className="flex gap-5 max-md:flex-col md:flex-row-reverse">
        {/* Left content on small devices, right on large screens */}
        <div className="flex justify-end w-[77%] md:w-[23%] mr-[-15px]">
          <div className="flex flex-col items-start w-full max-md:mt-10 ms-40 px-3">
            <h2 className="text-base font-medium tracking-normal text-neutral-800 ms-2">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-sm leading-5 text-stone-500 ms-2">
              Join 2,100+ other members and get updates on new products and
              startups.
            </p>
            <NewsletterForm />
            <SocialIcons />
          </div>
        </div>

        {/* Right content on small devices, left on large screens */}
        <div className="flex flex-col  w-[100%] md:w-[77%]">
          <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
            <div className="max-w-full ms-0">
              <div className="flex gap-5">
                {linkColumns.map((column, index) => (
                  <LinkColumn
                    key={index}
                    title={column.title}
                    links={column.links}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 border-t-[1px] w-full border-[#D4D4D4]"></div>
      {/* Footer text */}
      <div className="flex justify-between w-[100%] mt-5">
        <p className="text-xs text-stone-500">
          &copy; {currentYear} Product Hunt. All rights reserved.
        </p>
        <p className="mb-12 text-xs text-stone-500">
          This website may contain affiliate links
        </p>
      </div>
    </footer>
  );
};

export default Footer;
