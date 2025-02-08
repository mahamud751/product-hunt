"use client";
import React, { useState, useEffect } from "react";
import HeroCard from "./HeroCard";

interface ImageData {
  imageUrl: string;
  title: string;
  headline: string;
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
      headline:
        "Your personal AI assistant for task automation and productivity enhancement. Streamline your workflow with advanced AI capabilities.",
      rating: 4.8,
      reviews: 37,
      price: "$ 200",
    },
    {
      imageUrl:
        "https://images.unsplash.com/1/work-stations-plus-espresso.jpg?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "London Eye Tickets",
      headline:
        "Your personal AI assistant for task automation and productivity enhancement. Streamline your workflow with advanced AI capabilities.",
      rating: 4.7,
      reviews: 42,
      price: "$ 250",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1516201580490-33550d32de5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Eiffel Tower Skip-the-Line",
      headline:
        "Your personal AI assistant for task automation and productivity enhancement. Streamline your workflow with advanced AI capabilities.",
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

  const filteredImages = images.filter((_, index) => index !== selectedIndex);

  return (
    <div className="flex flex-col md:flex-row md:gap-3 items-center justify-center bg-[#f6f8f9] p-5 rounded-lg">
      <div className="w-full md:w-3/4">
        <p className="text-xl font-bold mb-1">Featured Today</p>
        <HeroCard {...images[selectedIndex]} fullDetails />
      </div>

      <div className="w-full md:w-1/2 flex flex-wrap justify-start gap-2">
        {filteredImages.map((imageData, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(images.indexOf(imageData))}
            className={`cursor-pointer h-[220px] sm:h-[100px] w-full sm:w-1/2 md:w-full mt-4`}
          >
            <HeroCard {...imageData} fullDetails={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
