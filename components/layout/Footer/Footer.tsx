"use client";
import React from "react";

import SocialIcons from "./SocialIcon";
import NewsletterForm from "../../home/NewsLetter";
import LinkColumn from "./Links";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const linkColumns = [
    {
      title: "Browse:",
      links: [
        { label: "Alternatives", href: "/alternatives" },
        { label: "All Categories", href: "/categories" },
        { label: "AI & Assistants", href: "#" },
        { label: "Work & Productivity", href: "#" },
        { label: "Marketing & Sales", href: "#" },
        { label: "Social Media Tools", href: "#" },
      ],
    },
    {
      title: "Quick Links:",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Our Blog", href: "/blog" },
        { label: "Advertise", href: "#" },
        { label: "Add a Free Listing", href: "#" },
        { label: "Auto Submit", href: "/auto-submit" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/privacy-policy" },
      ],
    },
    {
      title: "Platforms:",
      links: [
        { label: "Leaderboard", href: "/leaderboard" },
        { label: "Community", href: "/community" },
        { label: "Winner Board", href: "/winner-board" },
        { label: "How it Works", href: "/how-work" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "Become An Affiliate", href: "/affiliate" },
      ],
    },
  ];

  return (
    <footer className="pt-14 my-0 border-t border-neutral-800 border-opacity-10 max-sm:py-8">
      <div className="flex gap-5 max-md:flex-col md:flex-row-reverse">
        {/* Left content on small devices, right on large screens */}
        <div className="flex justify-end w-[70%] md:w-[33%] mr-[-15px]">
          <div className="flex flex-col items-start w-full max-md:mt-10 ms-20 px-3">
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
        <div className="flex flex-col w-[100%] md:w-[70%]">
          <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
            <div className="max-w-full ms-0">
              <div className="flex gap-5">
                {linkColumns.map((column, index) => (
                  <LinkColumn
                    key={index}
                    title={column.title}
                    data={column.links}
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
