import React from "react";

import ImageGallery from "./ImageGallery";
const HeroSecion = () => {
  return (
    <div className="md:w-4/5 mx-auto px-12 py-8 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-40 bg-black text-[12px]">
      <div className="space-y-5">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-2xl md:text-2xl">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 mr-2">
              The Launchpad
            </span>
            for AI Founders.
          </h1>
        </div>
        <p className="text-base text-gray-200 sm:mt-5">
          Launch your product, gain credibility, and scale fast with a thriving
          AI community.
        </p>

        <div className="text-white">
          <div className="flex">
            <p className="mt-[40px]">Join 2,100+ AI enthusiasts</p>
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="email"
            className="min-h-[50px] w-[400px] md:w-[80%] p-4 text-white text-sm border border-[#5e4dcd] rounded-l-lg bg-transparent focus:border-[#3898EC] focus:outline-none"
            id="Email"
            name="Email"
            placeholder="Enter your email"
            autoComplete="off"
          />
          <input
            className="min-h-[54px] px-4 py-2 text-white text-sm bg-[#5e4dcd] rounded-r-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#5e5dcd]"
            value="Join now"
            type="submit"
          />
        </div>
      </div>

      <ImageGallery />
    </div>
  );
};

export default HeroSecion;
