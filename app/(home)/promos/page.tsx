"use client";
import { getPromoProducts } from "@/lib/server-actions";
import { getActiveCategory } from "@/lib/server-actions";
import { Product, Category } from "@/services/types";
import { Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { PromoPageCard } from "@/components/promos/PromoPageCard";

const Page = () => {
  const [categories, setCategories] = useState<any[]>([]); // Products to display
  const [allCategories, setAllCategories] = useState<Category[]>([]); // All categories to display as buttons
  const [loading, setLoading] = useState<boolean>(true); // To track loading state
  const [error, setError] = useState<string | null>(null); // To handle errors
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Selected category for filtering

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories (for buttons)
        const categoriesData = await getActiveCategory();
        setAllCategories(categoriesData);

        // Fetch promo products (with optional category filter)
        const data = await getPromoProducts(selectedCategory || undefined);
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]); // Re-fetch products when selectedCategory changes

  // Handle category button click to filter products
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId); // Update selected category
  };

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

      <div className="mb-5">
        {/* Render category buttons */}
        <Grid container spacing={2}>
          {allCategories.map((category) => (
            <Grid item key={category.id}>
              <Button
                variant="outlined"
                onClick={() => category.id && handleCategoryClick(category.id)}
                color={selectedCategory === category.id ? "primary" : "inherit"}
              >
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>

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
