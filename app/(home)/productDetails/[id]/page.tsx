"use client";
import { auth } from "@/auth";
import DetailsPageCard from "@/components/alternative/DetailsPageCard";
import ProductModalContent from "@/components/product-modal-content";
import { getProductById } from "@/lib/server-actions";
import { Grid } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const ProductsDetails = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide
  const [activeTab, setActiveTab] = useState("Overview"); // Track the active tab
  const productRefs = useRef<HTMLDivElement[]>([]);
  const [totalUpvotes, setTotalUpvotes] = useState(product?.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(
    product?.upvoters?.includes(authenticatedUser?.user.id)
  );

  useEffect(() => {
    const fetchAlternativeDetails = async () => {
      try {
        const data = await getProductById(id as string);
        setProduct(data);
        const user = await auth(); // Fetch the authenticated user
        setAuthenticatedUser(user);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternativeDetails();
  }, [id]);

  const scrollToProduct = (index: number) => {
    productRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div>
            <h1 className="text-4xl font-semibold tracking-tighter leading-none">
              {product?.name}
            </h1>
            <p className="text-lg leading-loose text-neutral-600 mt-2">
              {product?.headline?.slice(0, 80)}{" "}
              {product?.headline?.length > 80 && "..."}
            </p>
            <p className="text-lg leading-loose text-neutral-600 mt-8">
              {product?.description?.slice(0, 200)}{" "}
              {product?.description?.length > 200 && "..."}
            </p>
            <div className="relative w-full h-auto mt-8">
              {/* Slider container */}
              <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden">
                {product?.photos?.map((data: any, index: number) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-500 ease-in-out ${
                      index === currentIndex ? "opacity-100 z-10" : "opacity-0"
                    }`}
                    style={{ width: "70%", height: "100%" }}
                  >
                    <Image
                      loading="lazy"
                      src={data}
                      alt=""
                      className="object-contain w-full h-full"
                      width={1000}
                      height={1000}
                    />
                  </div>
                ))}
              </div>

              {/* Previous Button */}
              <button
                onClick={handlePrevSlide}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-gray-800 bg-opacity-50 text-white w-[40px] h-[40px] rounded-full hover:bg-opacity-75 flex items-center justify-center"
              >
                &#10094;
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextSlide}
                className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-800 bg-opacity-50 text-white w-[40px] h-[40px] rounded-full hover:bg-opacity-75 flex items-center justify-center"
              >
                &#10095;
              </button>
            </div>
            <ProductModalContent
              currentProduct={product}
              authenticatedUser={authenticatedUser}
              setTotalUpvotes={setTotalUpvotes}
              totalUpvotes={totalUpvotes}
              hasUpvoted={hasUpvoted}
              setHasUpvoted={setHasUpvoted}
            />
          </div>
        );
      case "Launches":
      case "Reviews":
      case "Team":
      case "Awards":
        return (
          <div className="text-center">
            <p className="text-lg">Upcoming...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="w-full mx-auto py-8">
        <Grid container spacing={3}>
          {/* Left Side Grid */}
          <Grid item xs={12} sm={6} md={8} lg={8}>
            {/* Tabs Section */}
            <div className="flex space-x-4 mb-8">
              {["Overview", "Launches", "Reviews", "Team", "Awards"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full ${
                      activeTab === tab
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Tab Content */}
            {renderTabContent()}

            {/* Slider Implementation */}
          </Grid>

          {/* Right Side Grid */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="mt-[120px] sticky top-10">
              <DetailsPageCard alternative={product} />
              <div className="mt-7 px-6">
                {product?.products?.map((data: any, index: number) => (
                  <div
                    key={index}
                    className="hover:bg-[#F5F5F5] active:bg-[#F5F5F5] rounded-lg text-neutral-500 my-1 cursor-pointer"
                    onClick={() => scrollToProduct(index)}
                  >
                    <div className="flex justify-between items-center px-3 py-3 text-sm">
                      <div className="flex gap-2.5 items-center">
                        <Image
                          src={data?.logo}
                          alt=""
                          className="object-contain w-4 rounded aspect-[1.07] max-sm:w-3.5"
                          width={150}
                          height={150}
                        />
                        <div className="font-medium text-zinc-800">
                          {data?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProductsDetails;
