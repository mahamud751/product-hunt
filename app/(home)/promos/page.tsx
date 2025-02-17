"use client";
import {
  Grid,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";

import { LocalOffer, NewReleases, TrendingUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { PromoPageCard } from "@/components/promos/PromoPageCard";
import { getPromoProducts, getActiveCategory } from "@/lib/server-actions";
import { Category } from "@/services/types";
import { Search } from "lucide-react";

const Page = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("NameAsc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getActiveCategory();
        setAllCategories(categoriesData);

        const data = await getPromoProducts(
          searchQuery,
          sortOrder,
          selectedCategory || undefined
        );
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchQuery, sortOrder]);

  const handleCategoryChange = (event: any, newValue: Category | null) => {
    setSelectedCategory(newValue?.id || null);
    setLoading(true);
    setViewAll(false);
  };

  const handleViewAll = () => {
    setViewAll(true);
  };

  const displayedCategories = viewAll ? categories : categories.slice(0, 15);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="w-full bg-white rounded-[5px] shadow-md">
        <div className="flex justify-center px-20 py-8 w-full">
          <div>
            <h1 className="mb-2.5 text-4xl font-extrabold leading-none text-center text-gray-900 max-md:text-3xl max-sm:px-4 max-sm:py-0 max-sm:text-3xl">
              Unlock Exclusive Product Deals – Save Big on Top Tools
            </h1>
            <h6 className="mb-7 text-xl font-bold leading-snug text-center text-gray-800 max-md:text-lg max-sm:px-4 max-sm:py-0 max-sm:text-base">
              Get 10–80% Off Premium Software & Supercharge Your Workflow Today
            </h6>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                md={4}
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <div className="bg-blue-500 text-white rounded-full p-2">
                  <LocalOffer fontSize="large" />
                </div>
                <Typography variant="h6" align="center" className="mt-2">
                  Exclusive Deals
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <div className="bg-green-500 text-white rounded-full p-2">
                  <NewReleases fontSize="large" />
                </div>
                <Typography variant="h6" align="center" className="mt-2">
                  Best Prices
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <div className="bg-yellow-500 text-white rounded-full p-2">
                  <TrendingUp fontSize="large" />
                </div>
                <Typography variant="h6" align="center" className="mt-2">
                  Limited Time
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      {/* Search and Sort Section */}
      <div className="flex mt-16">
        <div className="w-[50%]">
          <form className="flex items-center px-3 py-2 bg-white rounded-lg border border-solid border-neutral-200 max-md:px-5">
            <div className="flex items-center gap-2 w-full">
              <Search className="text-neutral-600 text-opacity-50 w-5 h-5" />
              <label htmlFor="searchInput" className="sr-only">
                Search alternatives
              </label>
              <input
                id="searchInput"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={`Search in alternatives...`}
                className="w-full text-sm font-medium text-neutral-600 text-opacity-50 focus:outline-none"
                aria-label="Search alternatives"
              />
            </div>
          </form>
        </div>

        <div className="ms-5 w-[40%]">
          <Autocomplete
            options={allCategories}
            getOptionLabel={(option) => option.name}
            onChange={handleCategoryChange}
            value={
              allCategories.find((cat) => cat.id === selectedCategory) || null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Category"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "36px",
                    borderColor: "GrayText",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "GrayText",
                      borderWidth: "0px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "GrayText",
                      borderWidth: "0px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "GrayText",
                    },
                    backgroundColor: "white",
                    fontSize: 14,
                  },
                }}
                className="border border-solid border-neutral-200 rounded-sm"
              />
            )}
          />
        </div>

        <div className="ms-5 w-[160px]">
          <FormControl fullWidth size="small">
            <Select
              className="border border-solid border-neutral-200"
              value={sortOrder}
              onChange={handleSortChange}
              sx={{
                borderRadius: 2,
                width: "160px",
                height: "36px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "GrayText",
                  borderWidth: "0px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "GrayText",
                  borderWidth: "0px",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "GrayText",
                },
                backgroundColor: "white",
                fontSize: 14,
              }}
            >
              <MenuItem className="text-[14px]" value="Popularity">
                Popularity
              </MenuItem>
              <MenuItem className="text-[14px]" value="Latest">
                Latest
              </MenuItem>
              <MenuItem className="text-[14px]" value="NameAsc">
                Name A-Z
              </MenuItem>
              <MenuItem className="text-[14px]" value="NameDesc">
                Name Z-A
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Autocomplete Category Section */}

      <Grid container spacing={3} className="mb-10 mt-5">
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
        <div className="flex justify-center mt-10 mb-20">
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
