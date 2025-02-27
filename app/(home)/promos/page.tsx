"use client";
import { useState, useEffect, MouseEvent } from "react";
import { Button, MenuItem, Menu, Breadcrumbs } from "@mui/material";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  PlusCircle,
  Home,
} from "lucide-react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getPromoProducts, getActiveCategory } from "@/lib/server-actions";
import { Category } from "@/services/types";
import { DealCard } from "@/components/promos/DealCard";
import PromoPagination from "@/components/promos/PromoPagination";
import Link from "next/link";

type SortOrder = "Popularity" | "Latest" | "NameAsc" | "NameDesc";
const Page = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [totalPromos, setTotalPromos] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOrder, setSortOrder] = useState<string>("Order by");
  const [categoryAnchorEl, setCategoryAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const rowsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getActiveCategory();
        setAllCategories(categoriesData);

        const data = await getPromoProducts(
          currentPage - 1,
          rowsPerPage,
          searchQuery,
          sortOrder,
          selectedCategory || undefined
        );
        setCategories(data.promoProducts);
        setTotalPromos(data.totalPromos);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedCategory, searchQuery, sortOrder]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPrev = (type: "prev" | "next") => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      type === "next" &&
      currentPage < Math.ceil(totalPromos / rowsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(totalPromos / rowsPerPage);

  const handleViewAll = () => {
    setViewAll(true);
  };

  const displayedCategories = viewAll ? categories : categories.slice(0, 15);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (sort: SortOrder) => {
    setSortOrder(sort);
    setAnchorEl(null);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (event: MouseEvent<HTMLButtonElement>) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCategoryAnchorEl(null); // Close the menu after selection
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        className="my-4"
      >
        <Link color="inherit" href="/" className="flex items-center gap-1">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="ms-[2px]">Home</span>
        </Link>
        <span>Promos</span>
      </Breadcrumbs>
      <div className="bg-[#F5F5F5] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#1F1F1F] mb-4">
            Unlock Exclusive Product Deals – Save Big on Top Tools
          </h1>
          <h3 className="text-xl text-[#1F1F1F]/80 mb-8">
            Get 10–80% Off Premium Software & Supercharge Your Workflow Today
          </h3>
          <button className="bg-[#AF583B] text-white px-6 py-3 rounded-lg hover:bg-[#AF583B]/90 transition-colors">
            Browse Deals
          </button>
        </div>
      </div>

      {/* Search and Sort Section */}
      <div className="bg-[#F5F5F5] rounded-lg p-4 shadow-sm mt-12">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F1F1F]/40" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1F1F1F]/10 focus:outline-none focus:ring-2 focus:ring-[#AF583B]/20"
            />
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1F1F1F]/10 hover:bg-[#1F1F1F]/5 transition-colors"
            onClick={handleCategoryClick}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>All Categories</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <Menu
            anchorEl={categoryAnchorEl}
            open={Boolean(categoryAnchorEl)}
            onClose={handleCategoryClose}
            MenuListProps={{
              "aria-labelledby": "category-button",
              style: {
                maxHeight: "300px",
                overflowY: "auto",
                padding: "8px 0",
              },
            }}
            PaperProps={{
              style: {
                width: categoryAnchorEl
                  ? categoryAnchorEl.clientWidth
                  : undefined,
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e0e0e0",
              },
            }}
          >
            <MenuItem
              className="text-[14px] px-4 py-2 hover:bg-neutral-100 transition-colors duration-200"
              onClick={() => handleCategorySelect(null)}
            >
              All Categories
            </MenuItem>
            {allCategories.map((category) => (
              <MenuItem
                key={category.id}
                className="text-[14px] px-4 py-2 hover:bg-neutral-100 transition-colors duration-200"
                onClick={() => handleCategorySelect(category.id || null)}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>

          <div className="ms-5 w-[200px]">
            <button
              className="flex items-center justify-between gap-2 w-full px-4 py-2 rounded-lg border border-[#1F1F1F]/10 hover:bg-[#1F1F1F]/5 transition-colors"
              onClick={handleClick}
            >
              <span>Sort by: {sortOrder}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "sort-button",
              }}
              PaperProps={{
                style: {
                  width: anchorEl ? anchorEl.clientWidth : undefined, // Ensures the menu width matches the button width
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <MenuItem
                className="text-[14px] px-4 py-2 hover:bg-neutral-100"
                onClick={() => handleSortChange("Popularity")}
              >
                Popularity
              </MenuItem>
              <MenuItem
                className="text-[14px] px-4 py-2 hover:bg-neutral-100"
                onClick={() => handleSortChange("Latest")}
              >
                Latest
              </MenuItem>
              <MenuItem
                className="text-[14px] px-4 py-2 hover:bg-neutral-100"
                onClick={() => handleSortChange("NameAsc")}
              >
                Name A-Z
              </MenuItem>
              <MenuItem
                className="text-[14px] px-4 py-2 hover:bg-neutral-100"
                onClick={() => handleSortChange("NameDesc")}
              >
                Name Z-A
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {displayedCategories?.length > 0 ? (
          displayedCategories?.map((data, index) => (
            <DealCard key={index} data={data} />
          ))
        ) : (
          <>
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
              <p className="text-lg text-gray-500">No data found</p>
            </div>
          </>
        )}
      </div>

      <PromoPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onNextPrev={handleNextPrev}
      />

      <div className="text-center mt-12 mb-12">
        <button className="inline-flex items-center gap-2 bg-[#AF583B] text-white px-6 py-3 rounded-lg hover:bg-[#AF583B]/90 transition-colors">
          <PlusCircle className="w-5 h-5" />
          Submit Your Deal
        </button>
      </div>

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
