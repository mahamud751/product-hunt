"use client";
import AlternativeCard from "@/components/alternative/AlternativeCard";
import { AlternativePagination } from "@/components/alternative/Pagination";
import { getAlternatives } from "@/lib/server-actions";
import { Grid, Menu } from "@mui/material";
import { ChevronDown, Search } from "lucide-react";
import React, { MouseEvent, useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

type SortOrder = "Popularity" | "Latest" | "NameAsc" | "NameDesc";
const Page = () => {
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [totalAlternatives, setTotalAlternatives] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOrder, setSortOrder] = useState<string>("NameAsc");
  const rowsPerPage = 6;

  useEffect(() => {
    const fetchAlternatives = async () => {
      const { alternatives, totalAlternatives } = await getAlternatives(
        currentPage - 1,
        rowsPerPage,
        undefined,
        searchQuery,
        sortOrder
      );
      setAlternatives(alternatives);
      setTotalAlternatives(totalAlternatives);
    };

    fetchAlternatives();
  }, [currentPage, searchQuery, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPrev = (type: "prev" | "next") => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      type === "next" &&
      currentPage < Math.ceil(totalAlternatives / rowsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  const totalPages = Math.ceil(totalAlternatives / rowsPerPage);

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

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tighter leading-none mt-5">
        Browse the Best Software Alternatives &
        <br />
        Competitors
      </h1>
      <br />
      <p className="text-xm mt-1 text-[#4D4D4D]">
        Discover a comprehensive list of top software alternatives and
        competitors, including open- <br />
        source options for {totalAlternatives} popular tools.
      </p>
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

      {/* Alternative Cards */}
      <Grid container columnSpacing={2} className="mb-10">
        {alternatives.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AlternativeCard data={data} />
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <div className="flex justify-center">
        <AlternativePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onNextPrev={handleNextPrev}
        />
      </div>
    </div>
  );
};

export default Page;
