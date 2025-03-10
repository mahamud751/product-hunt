"use client";
import Image from "next/image";
import { useState } from "react";

const ImageSlider = ({ photos }: { photos: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = photos.length;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const calculateWidths = (index: number) => {
    if (currentIndex === index) {
      return "w-[40%]";
    }
    if (index === 0 && currentIndex !== 0) {
      return "w-[20%]";
    }
    if (
      (currentIndex + 1) % totalSlides === index ||
      (currentIndex - 1 + totalSlides) % totalSlides === index
    ) {
      return "w-[40%]";
    }
    return "w-[20%]";
  };

  return (
    <div className="relative mb-8">
      <div className="overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-500 ease-in-out">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`flex-shrink-0 transition-all duration-500 ${calculateWidths(
                index
              )} px-1`}
            >
              <Image
                src={photo}
                alt={`Product Screenshot ${index + 1}`}
                className="w-full h-[200px] object-cover rounded-lg"
                width={800}
                height={450}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-4 mt-[-10px] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300"
        aria-label="Previous Slide"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-4 mt-[-10px] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300"
        aria-label="Next Slide"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Two Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={goToPrevious}
          className="w-2 h-2 rounded-full bg-black hover:bg-gray-800 transition-all duration-300"
          aria-label="Previous Slide"
        />
        <button
          onClick={goToNext}
          className="w-2 h-2 rounded-full bg-black hover:bg-gray-800 transition-all duration-300"
          aria-label="Next Slide"
        />
      </div>
    </div>
  );
};

export default ImageSlider;
