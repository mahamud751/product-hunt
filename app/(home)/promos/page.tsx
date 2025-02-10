"use client"; // ensure it's a client-side component
import AlternativeCard from "@/components/alternative/AlternativeCard";
import PaginationComponent from "@/components/alternative/Pagination";
import PromoCard from "@/components/home/PromoCard";
import { PromoPageCard } from "@/components/promos/PromoPageCard";
import { getAlternatives, getPromoProducts } from "@/lib/server-actions";
import { Category, Product } from "@/services/types";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [categories, setCategories] = useState<Product[]>([]);
  useEffect(() => {
    getPromoProducts().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tighter leading-none mt-5">
        Browse Open Source Software Alternatives
      </h1>
      {/* <p className="text-xm mt-3 text-[#4D4D4D]">
        Discover top open source alternatives to {totalAlternatives} popular
        proprietary software tools.
      </p> */}

      {/* Alternative Cards */}
      <Grid container columnSpacing={2} className="mb-10">
        {categories.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PromoPageCard data={data} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Page;
