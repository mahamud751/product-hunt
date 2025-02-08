import React from "react";

const SocialIcons: React.FC = () => {
  const icons = [
    "rss",
    "mail",
    "brand-github",
    "brand-twitter",
    "butterfly",
    "brand-linkedin",
    "dots",
  ];

  return (
    <div className="flex gap-2 mt-3.5 max-sm:justify-center">
      {icons.map((icon, index) => (
        <i
          key={index}
          className={`ti ti-${icon} text-xl text-stone-500`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default SocialIcons;
