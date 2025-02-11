"use client"; // ensure it's a client-side component
import AlternativeCard from "@/components/alternative/AlternativeCard";
import PaginationComponent from "@/components/alternative/Pagination";
import { getAlternatives } from "@/lib/server-actions";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [totalAlternatives, setTotalAlternatives] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("NameAsc");
  const rowsPerPage = 10;

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tighter leading-none mt-5">
        Browse Open Source Software Alternatives
      </h1>
      <p className="text-xm mt-3 text-[#4D4D4D]">
        Discover top open source alternatives to {totalAlternatives} popular
        proprietary software tools.
      </p>
      <div className="flex mt-10">
        <div className="w-[90%]">
          <form className="overflow-hidden px-10 py-2 bg-white rounded-lg border border-solid border-neutral-200 max-md:px-5">
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
          </form>
        </div>

        <div className="ms-12 w-[120px]">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-3.5 w-full text-sm font-medium leading-none bg-white rounded-lg border border-solid border-neutral-200 text-neutral-600"
          >
            <option value="Popularity">Order by Popularity</option>
            <option value="Latest">Order by Latest</option>
            <option value="NameAsc">Order by Name A-Z</option>
            <option value="NameDesc">Order by Name Z-A</option>
          </select>
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
      <PaginationComponent
        currentPage={currentPage}
        totalPages={Math.ceil(totalAlternatives / rowsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Page;
