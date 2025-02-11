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
  const [viewAll, setViewAll] = useState<boolean>(false);

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
    setViewAll(false);
  };

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setViewAll(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const displayedCategories = viewAll ? categories : categories.slice(0, 15);

  return (
    <div>
      <div className="w-full bg-gray-100">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center px-20 py-16 w-full max-w-[1920px] max-md:px-10 max-md:py-12 max-sm:px-5 max-sm:py-8">
            <div className="flex flex-col items-center w-full max-w-[545px] max-sm:max-w-full">
              <h1 className="mb-2.5 text-4xl font-extrabold leading-none text-center text-gray-900 max-md:text-3xl max-sm:px-4 max-sm:py-0 max-sm:text-3xl">
                Discover Unique Deals on Saas
              </h1>
              <h2 className="text-xl font-bold leading-snug text-center text-gray-800 max-md:text-lg max-sm:px-4 max-sm:py-0 max-sm:text-base">
                Save 20-80% on Top Products
              </h2>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm font-semibold tracking-tighter leading-none mt-16">
        Shop by Category
      </p>

      <div className="mb-5 mt-3">
        <Grid container spacing={2}>
          <div className="mt-4 ms-4">
            <Button
              variant="outlined"
              onClick={handleShowAll}
              color={selectedCategory === null ? "primary" : "inherit"}
              className="px-3.5 py-2 text-xs leading-none text-center text-gray-700 whitespace-nowrap bg-gray-100 rounded-full transition-all cursor-pointer select-none duration-[0.2s] ease-[ease-in-out] w-fit max-md:px-3 max-md:py-2 max-md:text-xs max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
            >
              All
            </Button>
          </div>
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
                className="px-3.5 py-2 text-xs leading-none text-center text-gray-700 whitespace-nowrap bg-gray-100 rounded-full transition-all cursor-pointer select-none duration-[0.2s] ease-[ease-in-out] w-fit max-md:px-3 max-md:py-2 max-md:text-xs max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
              >
                {category?.name?.slice(0, 8)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>

      <Grid container spacing={3} className="mb-10">
        {displayedCategories?.length > 0 ? (
          displayedCategories?.map((data) => (
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

      {categories?.length > 15 && !viewAll && (
        <div className="flex justify-center mt-10 mb-36">
          <Button
            onClick={handleViewAll}
            className="px-6 py-3 text-sm font-medium bg-gray-100 rounded-md cursor-pointer select-none duration-[0.2s] ease-[ease] text-slate-900 transition-[background-color]"
          >
            View All Deals
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
