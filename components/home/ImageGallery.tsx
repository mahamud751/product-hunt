"use client";
import React, { useState, useEffect } from "react";
import HeroCard from "./HeroCard";

interface ImageData {
  imageUrl: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  price: string;
}

const ImageGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images: ImageData[] = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      title: "Paris Catacombs Tickets",
      subtitle: "And Audio Guided",
      rating: 4.8,
      reviews: 37,
      price: "$ 200",
    },
    {
      imageUrl:
        "https://images.unsplash.com/1/work-stations-plus-espresso.jpg?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "London Eye Tickets",
      subtitle: "With Fast Track Entry",
      rating: 4.7,
      reviews: 42,
      price: "$ 250",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1516201580490-33550d32de5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Eiffel Tower Skip-the-Line",
      subtitle: "With Summit Access",
      rating: 4.9,
      reviews: 58,
      price: "$ 300",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % images.length;
      setSelectedIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedIndex, images.length]);

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
  };

  // Filter out the selected image from the right side gallery
  const filteredImages = images.filter((_, index) => index !== selectedIndex);

  return (
    <div className="flex flex-col md:flex-row md:gap-8 items-center justify-center">
      {/* Left Side: Selected Image */}
      <div className="w-full md:w-3/4 h-[200px] sm:h-[300px]">
        <HeroCard {...images[selectedIndex]} fullDetails />
      </div>

      {/* Right Side: Remaining Images */}
      <div className="w-full md:w-1/2 flex flex-wrap justify-start gap-3 mt-4 md:mt-0">
        {filteredImages.map((imageData, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(images.indexOf(imageData))}
            className={`cursor-pointer h-[200px] sm:h-[140px] w-full sm:w-1/2 md:w-full`}
          >
            <HeroCard {...imageData} fullDetails={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
