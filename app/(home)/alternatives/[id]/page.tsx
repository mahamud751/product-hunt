"use client";
import DetailsPageCard from "@/components/alternative/DetailsPageCard";
import { getSingleAlternative } from "@/lib/server-actions";
import { Grid } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface AlternativeDetailsProps {
  params: {
    id: string;
  };
}

const AlternativeDetails = ({ params: { id } }: AlternativeDetailsProps) => {
  const [alternative, setAlternative] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const productRefs = useRef<HTMLDivElement[]>([]); // Array of refs for products on the left grid

  useEffect(() => {
    const fetchAlternativeDetails = async () => {
      try {
        const data = await getSingleAlternative(id);
        setAlternative(data);
      } catch (error) {
        console.error("Error fetching alternative details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlternativeDetails();
  }, [id]);

  const scrollToProduct = (index: number) => {
    // Scroll to the product on the left grid when an item is clicked on the right side
    productRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!alternative) {
    return <p>No alternative found.</p>;
  }

  return (
    <div>
      <div className="w-full mx-auto py-8">
        <Grid container spacing={3}>
          {/* Left Side Grid */}
          <Grid item xs={12} sm={6} md={8} lg={8}>
            <div className="py-8">
              <h1 className="text-4xl font-semibold tracking-tighter leading-none">
                Open Source {alternative?.name} Alternatives
              </h1>
              <p className="text-lg leading-loose text-neutral-600 mt-2">
                {alternative?.title}
              </p>
              <p className="text-lg leading-loose text-neutral-600 mt-2">
                {alternative?.description}
              </p>
            </div>

            <div>
              {alternative?.products?.map((data: any, index: number) => (
                <div
                  className="mt-4"
                  key={index}
                  //@ts-ignore
                  ref={(el) => (productRefs.current[index] = el!)}
                >
                  <div className="flex">
                    <p className="ms-[-60px] text-4xl font-semibold tracking-tighter leading-none">
                      #{index + 1}
                    </p>
                    <div className="ms-6">
                      <Image
                        src={data?.logo}
                        alt={data?.name}
                        width={200}
                        height={200}
                        className="object-contain shrink-0 w-9 h-9 rounded aspect-square max-md:w-8 max-md:h-8 max-sm:w-7 max-sm:h-7"
                      />
                    </div>
                    <h1 className="ms-4 text-4xl font-semibold tracking-tighter leading-none">
                      {data?.name}
                    </h1>
                  </div>
                  <p className="text-lg leading-loose text-neutral-600 mt-2">
                    {data?.headline}
                  </p>
                  <p className="text-lg leading-loose text-neutral-600 mt-2">
                    {data?.description}
                  </p>
                  <button className="flex mb-20 gap-5 justify-between px-4 py-4 mt-6 font-medium leading-none text-white rounded-lg bg-stone-900">
                    <span className="my-auto">Read more</span>
                    <Image
                      loading="lazy"
                      src="/images/SVG.png"
                      alt=""
                      className="object-contain shrink-0 aspect-square w-[15px]"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Grid>

          {/* Right Side Grid */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="mt-[120px] sticky top-10">
              <DetailsPageCard alternative={alternative} />
              <div className="mt-7 px-6">
                {alternative?.products?.map((data: any, index: number) => (
                  <div
                    key={index}
                    className="hover:bg-[#F5F5F5] active:bg-[#F5F5F5] rounded-lg text-neutral-500 my-1 cursor-pointer"
                    onClick={() => scrollToProduct(index)} // Scroll to corresponding product on click
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

export default AlternativeDetails;
