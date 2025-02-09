import AlternativeCard from "@/components/alternative/AlternativeCard";
import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

const page = () => {
  const totalCard = 60;
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tighter leading-none mt-5">
        Browse Open Source Software Alternatives
      </h1>
      <h1 className="text-xm  mt-3 text-[#4D4D4D]">
        Discover top open source alternatives to 275+ popular proprietary
        software tools.
      </h1>
      <div className="flex mt-10">
        <div className="w-[90%]">
          <form className="overflow-hidden px-10 py-2 bg-white rounded-lg border border-solid border-neutral-200 max-md:px-5">
            <label htmlFor="searchInput" className="sr-only">
              Search alternatives
            </label>
            <input
              id="searchInput"
              type="text"
              placeholder={"Search in 278 alternatives..."}
              className="w-full text-sm font-medium text-neutral-600 text-opacity-50 focus:outline-none"
              aria-label="Search alternatives"
            />
          </form>
        </div>
        <div className="flex flex-col text-sm font-medium leading-none bg-white rounded-lg border border-solid border-neutral-200  text-neutral-600 ms-12 w-[120px]">
          <div className="flex overflow-hidden relative flex-col px-4 py-3.5 w-full aspect-[3.6]">
            <span className="relative z-10">Order by</span>
          </div>
        </div>
      </div>
      <Grid container spacing={0} className="mb-10">
        {Array.from({ length: totalCard }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AlternativeCard />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default page;
