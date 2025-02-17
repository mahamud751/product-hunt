"use client";
import AlternativeCard from "@/components/alternative/AlternativeCard";
import PaginationComponent from "@/components/alternative/Pagination";
import { getAlternatives } from "@/lib/server-actions";
import { Grid, SelectChangeEvent } from "@mui/material";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const Page = () => {
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [totalAlternatives, setTotalAlternatives] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("NameAsc");
  const rowsPerPage = 9;

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
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
      <div className="flex mt-10">
        <div className="w-[90%]">
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
                placeholder={`Search in ${totalAlternatives} alternatives...`}
                className="w-full text-sm font-medium text-neutral-600 text-opacity-50 focus:outline-none"
                aria-label="Search alternatives"
              />
            </div>
          </form>
        </div>

        <div className="ms-5 w-[160px]">
          <FormControl fullWidth size="small">
            {" "}
            <Select
              className="border border-solid border-neutral-200"
              value={sortOrder}
              onChange={handleSortChange}
              sx={{
                borderRadius: 2,
                width: "160px",
                height: "40px",
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
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(totalAlternatives / rowsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Page;
