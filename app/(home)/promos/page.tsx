"use client";
import { getPromoProducts } from "@/lib/server-actions";
import { Product } from "@/services/types";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { PromoPageCard } from "@/components/promos/PromoPageCard";

const Page = () => {
  const [categories, setCategories] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // to track loading state
  const [error, setError] = useState<string | null>(null); // to handle errors

  useEffect(() => {
    // Fetch promo products and set data
    const fetchData = async () => {
      try {
        const data = await getPromoProducts();
        setCategories(data as unknown as Product[]); // Convert to unknown first, then to Product[]
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error if there's an issue
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tighter leading-none mt-5">
        Browse Open Source Software Alternatives
      </h1>

      <Grid container columnSpacing={2} className="mb-10">
        {categories.map((data) => (
          <Grid item xs={12} sm={6} md={4} key={data.id}>
            <PromoPageCard data={data} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Page;
