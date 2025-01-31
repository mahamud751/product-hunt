import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import StarIcon from "@mui/icons-material/Star";

import StyleIcon from "@mui/icons-material/Style";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import Logo from "../navbar/logo";
const HeroSecion = () => {
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      className="w-screen px-24 py-12 bg-black text-[12px]"
      sx={{ flexGrow: 1 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <div className="space-y-3">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="rounded-full uppercase bg-pink-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                  A Launch Platform
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  <span className="sm:text-6xl"></span> for
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                    World-Class
                  </span>
                  <br />
                  Startups.
                </h1>
              </div>
              <p className="text-base text-gray-200 sm:mt-5">
                Startups rank over a month, get feedback and upvotes. Discover
                hidden gems and vote for top products.
              </p>
            </div>
            <div className="text-white">
              <div className="flex">
                <DateRangeIcon fontSize="small" className="text-white" />
                <p className="ms-2 mt-[-3px]">{formattedDate}</p>
              </div>
            </div>
            <div className="text-white">
              <div className="flex">
                <AddAlertIcon fontSize="small" className="text-white" />
                <p className="ms-2 mt-[-3px]">
                  <span className="underline">Remaining</span> 1 days, 4h:13m
                </p>
              </div>
            </div>
            <div className="text-white">
              <div className="flex">
                <StyleIcon fontSize="small" className="text-white" />
                <p className="ms-2 mt-[-3px]">300 products</p>
              </div>
            </div>
            <div className="text-white">
              <div className="flex">
                <div className="ml-0.5 w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="ms-5 mt-[-3px]">1000 daily visitors</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <div className="flex gap-4 ">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Hero Image"
                width={500}
                height={500}
                className="rounded-lg w-[450px] h-[300px]"
              />
            </div>
            <div>
              <div>
                <div className="flex">
                  <Logo />
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                      <span className="sm:text-2xl"></span> Korbo
                      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                        Joy
                      </span>
                    </h1>
                    <p className="text-base text-gray-200">
                      Launch, get feedback and first sales
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-white mt-3">
                <div className="flex">
                  <StarIcon fontSize="small" className="text-white" />
                  <p className="ms-2 mt-[-3px]">
                    Launch Now, Get Exposure & Distribute Apps
                  </p>
                </div>
              </div>
              <div className="text-white mt-1">
                <div className="flex">
                  <StarIcon fontSize="small" className="text-white" />
                  <p className="ms-2 mt-[-3px]">
                    Publish Deals, SEO pages, Backlinks
                  </p>
                </div>
              </div>
              <div className="text-white mt-1">
                <div className="flex">
                  <StarIcon fontSize="small" className="text-white" />
                  <p className="ms-2 mt-[-3px]">Loved by 200+ Saas Founders</p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSecion;
