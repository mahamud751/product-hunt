"use client";
import React from "react";
import ImageGallery from "./ImageGallery";

const HeroSection = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(email);
  };
  return (
    <div className="mx-auto py-8 grid grid-cols-1 md:grid-cols-[4fr_7fr] gap-2 md:gap-7 text-[12px]">
      <div className="space-y-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 mr-2">
            The Launchpad
          </span>
          for AI Founders.
        </h1>

        <p className="text-base sm:mt-5">
          Launch your product, gain credibility, and scale fast with a thriving
          AI community.
        </p>

        <div>
          <p className="mt-[20px] sm:mt-[40px]">Join 3,100+ AI enthusiasts</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex overflow-hidden gap-1 max-w-sm text-sm font-medium rounded-lg border border-solid border-neutral-200"
        >
          <div className="relative flex-grow">
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 bg-white rounded-lg text-neutral-600 text-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 my-auto leading-none text-center text-white bg-orange-800 rounded-md"
          >
            Join Now
          </button>
        </form>
      </div>

      {/* Image Gallery */}
      <ImageGallery />
    </div>
  );
};

export default HeroSection;
