"use client";
import { Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { PromoPageCard } from "@/components/promos/PromoPageCard";
import { getPromoProducts, getActiveCategory } from "@/lib/server-actions";
import { Category } from "@/services/types";

const Page = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getActiveCategory();
        setAllCategories(categoriesData);

        const data = await getPromoProducts(selectedCategory || undefined);
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLoading(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tighter leading-none mt-5">
        Browse Open Source Software Alternatives
      </h1>

      <div className="mb-5">
        <Grid container spacing={2}>
          {allCategories?.map((category) => (
            <Grid item key={category?.id}>
              <Button
                variant="outlined"
                onClick={() =>
                  category?.id && handleCategoryClick(category?.id)
                }
                color={
                  selectedCategory === category?.id ? "primary" : "inherit"
                }
                className="w-[120px]"
              >
                {category?.name?.slice(0, 15)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>

      <Grid container columnSpacing={2} className="mb-10">
        {categories.length > 0 ? (
          categories.map((data) => (
            <Grid item xs={12} sm={6} md={4} key={data?.id}>
              <PromoPageCard data={data} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-lg text-gray-500">No data found</p>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Page;
