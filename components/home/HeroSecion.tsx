import React from "react";
import ImageGallery from "./ImageGallery";

const HeroSection = () => {
  return (
    <div className="md:w-4/5 mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 md:gap-20 bg-black text-[12px]">
      {/* Text Section */}
      <div className="space-y-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 mr-2">
            The Launchpad
          </span>
          for AI Founders.
        </h1>

        <p className="text-base text-gray-200 sm:mt-5">
          Launch your product, gain credibility, and scale fast with a thriving
          AI community.
        </p>

        <div className="text-white">
          <p className="mt-[20px] sm:mt-[40px]">Join 2,100+ AI enthusiasts</p>
        </div>

        {/* Input Section */}
        <div className="flex flex-wrap items-center">
          <input
            type="email"
            className="min-h-[50px] w-full md:w-[60%] p-4 text-white text-sm border border-[#5e4dcd] rounded-l-lg bg-transparent focus:border-[#3898EC] focus:outline-none"
            id="Email"
            name="Email"
            placeholder="Enter your email"
            autoComplete="off"
          />
          <button className="min-h-[54px] wmd:w-auto -full px-4 py-2 text-white text-sm bg-[#5e4dcd] rounded-r-lg mt-2 md:mt-0 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#5e5dcd]">
            Join now
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery />
    </div>
  );
};

export default HeroSection;
