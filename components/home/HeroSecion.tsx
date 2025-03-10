"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Star,
  ArrowUpRight,
  Box,
  Laptop,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const spotlightProducts = [
  {
    id: 1,
    title: "Linear",
    description:
      "The issue Tracking Tool. Streamline software projects, sprints, tasks, and bug tracking.",
    rating: 4.7,
    reviews: 1345,
    image: "https://images.unsplash.com/photo-1661961110372-8a7682543120?w=800",
    badge: "New",
    icon: <Box className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Figma",
    description:
      "Design, prototype, and collaborate all in one place with this powerful interface design tool.",
    rating: 4.8,
    reviews: 1120,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800",
    badge: "Popular",
    icon: <Laptop className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Vercel",
    description:
      "Platform for frontend frameworks and static sites, built to integrate with your headless content.",
    rating: 4.7,
    reviews: 980,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    badge: "Featured",
    icon: <Zap className="w-5 h-5" />,
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPulsing, setIsPulsing] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + spotlightProducts.length) % spotlightProducts.length
    );
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % spotlightProducts.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "ArrowRight") handleNextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevSlide, handleNextSlide]);

  useEffect(() => {
    if (isAutoplayPaused) return;

    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNextSlide, isAutoplayPaused]);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 1500);
    return () => clearInterval(pulseInterval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNextSlide();
    if (isRightSwipe) handlePrevSlide();

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1080px] h-[250px] mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-4 relative">
          <div className="absolute -top-6 left-0 w-full h-32 bg-surface blur-3xl -z-10" />

          <div className="w-full md:w-[520px] space-y-3 text-left">
            <div className="inline-flex items-center px-3 py-1.5 rounded-[4px] text-xs font-medium bg-surface text-text backdrop-blur-sm border border-text/5">
              <span
                className={`w-2 h-2 rounded-full bg-primary mr-2 ${
                  isPulsing ? "animate-pulse" : ""
                }`}
              ></span>
              6 new products added
            </div>

            <h1 className="text-2xl sm:text-2xl font-bold text-text tracking-tight leading-tight">
              Discover, Launch & Grow the Next Big Thing
            </h1>

            <p className="text-sm sm:text-base text-text/80 leading-relaxed">
              Explore and launch the most exciting new products in tech, SaaS,
              and startups—powered by a thriving community of visionaries.
            </p>

            <div className="pt-2">
              <div className="bg-background p-3 rounded-[4px] shadow-lg shadow-text/5 border border-text/5">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-1.5 text-sm border border-text/10 rounded-l-[4px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background text-text"
                  />
                  <button className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-r-[4px] hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md">
                    Join our community
                  </button>
                </div>

                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <img
                      className="w-6 h-6 rounded-full border-2 border-background shadow-sm"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                      alt="User avatar"
                    />
                    <img
                      className="w-6 h-6 rounded-full border-2 border-background shadow-sm"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
                      alt="User avatar"
                    />
                    <img
                      className="w-6 h-6 rounded-full border-2 border-background shadow-sm"
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
                      alt="User avatar"
                    />
                    <img
                      className="w-6 h-6 rounded-full border-2 border-background shadow-sm"
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100"
                      alt="User avatar"
                    />
                    <img
                      className="w-6 h-6 rounded-full border-2 border-background shadow-sm"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                      alt="User avatar"
                    />
                  </div>
                  <span className="ml-3 text-xs sm:text-sm text-text/70">
                    Join 2,000+ founders, makers and product enthusiasts
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 mt-4 md:mt-0 flex justify-center">
            <div
              className="relative bg-text rounded-[4px] overflow-hidden shadow-2xl w-full max-w-[360px] border border-text/10 group"
              onMouseEnter={() => setIsAutoplayPaused(true)}
              onMouseLeave={() => setIsAutoplayPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-text/30 hover:bg-text/50 rounded-full p-2 w-9 h-9 flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-background" />
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-text/30 hover:bg-text/50 rounded-full p-2 w-9 h-9 flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
                onClick={handleNextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-background" />
              </button>

              <div className="relative w-full">
                {spotlightProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`transition-all duration-500 ${
                      index === currentSlide
                        ? "opacity-100 z-10 translate-x-0"
                        : `opacity-0 z-0 absolute inset-0 ${
                            index < currentSlide
                              ? "-translate-x-full"
                              : "translate-x-full"
                          }`
                    }`}
                  >
                    <div className="relative w-full h-[150px] bg-text">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/20 to-transparent" />
                    </div>

                    <div className="bg-text p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-9 h-9 bg-primary/20 rounded-[4px] flex items-center justify-center mr-3 p-2">
                          {product.icon}
                        </div>

                        <div>
                          <div className="flex items-center">
                            <h3 className="font-bold text-background text-sm">
                              {product.title}
                            </h3>
                            {product.badge && (
                              <span className="ml-2 text-[10px] font-medium bg-secondary/20 text-background px-2 py-0.5 rounded-full backdrop-blur-sm border border-secondary/20">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-background/70 line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(product.rating)
                                    ? "text-primary fill-primary"
                                    : "text-background/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-1.5 text-xs text-background/70">
                            {product.rating} ({product.reviews.toLocaleString()}
                            )
                          </span>
                        </div>

                        <button className="bg-primary hover:bg-primary/90 text-white text-xs font-medium px-3 py-1.5 rounded-[4px] flex items-center transition-all transform hover:scale-105 active:scale-95">
                          Try It Now
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-[60px] left-0 right-0 flex justify-center gap-1.5 z-30 opacity-0 transition-opacity group-hover:opacity-100">
                {spotlightProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all hover:scale-125 ${
                      index === currentSlide
                        ? "bg-background w-3 scale-110"
                        : "bg-background/50 hover:bg-background/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
