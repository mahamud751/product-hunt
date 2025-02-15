"use client";
import { auth } from "@/auth";
import DetailsPageCard from "@/components/alternative/DetailsPageCard";
import DetailsCard from "@/components/productDetails/DetailsCard";
import ProductComment from "@/components/productDetails/ProductComment";
import ProductFeaturedCard from "@/components/productDetails/ProductFeaturedCard";
import { getProductById } from "@/lib/server-actions";
import { Grid } from "@mui/material";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const ProductsDetails = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  console.log("product", product);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
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
        const user = await auth();
        setAuthenticatedUser(user);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternativeDetails();
  }, [id]);

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
            <DetailsCard product={product} />
            <h1 className="text-xl font-semibold tracking-tighter leading-none mt-5">
              What is {product?.name}
            </h1>

            <p className="text-lg leading-loose text-neutral-600 mt-8">
              {product?.description?.slice(0, 200)}{" "}
              {product?.description?.length > 200 && "..."}
            </p>

            <ProductComment
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
          <Grid item xs={12} sm={6} md={8} lg={8}>
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

            {renderTabContent()}
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="mt-[120px] sticky top-10">
              <DetailsPageCard alternative={product} />

              <ProductFeaturedCard />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProductsDetails;
