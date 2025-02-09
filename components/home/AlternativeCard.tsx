"use client";
import Image from "next/image";
import React from "react";
import { FaCopy } from "react-icons/fa";
import { Button, Container, Grid } from "@mui/material";
import Link from "next/link";

interface DataItem {
  id: number;
  image: string;
  title: string;
  description: string;
  alternatives: string;
}

const data: DataItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Efficient App",
    description: "Not all Open Source alternatives are equal",
    alternatives: "16 alternatives",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Productive App",
    description: "Boost your productivity with this tool",
    alternatives: "12 alternatives",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Creative App",
    description: "Unleash your creativity",
    alternatives: "8 alternatives",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Innovative App",
    description: "Innovate with the best tools",
    alternatives: "10 alternatives",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Collaborative App",
    description: "Work together seamlessly",
    alternatives: "14 alternatives",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Secure App",
    description: "Your data is safe with us",
    alternatives: "20 alternatives",
  },
];

interface AlternativeCardProps {
  image: string;
  title: string;
  description: string;
  alternatives: string;
}

const AlternativeCard: React.FC<AlternativeCardProps> = ({
  image,
  title,
  description,
  alternatives,
}) => {
  return (
    <div className="flex flex-col items-start px-5 py-6 rounded-lg border border-solid bg-neutral-50 border-neutral-200 transition-transform transform hover:shadow-sm hover:border-neutral-300">
      <div className="flex gap-3 text-xl font-semibold tracking-tight leading-snug whitespace-nowrap text-neutral-800">
        <button className="box-border flex flex-col justify-center items-center p-1.5 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
          <Image
            src={image}
            alt="logo"
            width={1000}
            height={1000}
            className="object-contain w-6 h-6 rounded aspect-square max-md:h-[22px] max-md:w-[22px] max-sm:w-5 max-sm:h-5"
          />
        </button>

        <div className="my-auto">{title}</div>
      </div>
      <div className="self-stretch mt-5 text-sm leading-5 text-neutral-600 h-[40px]">
        {description.slice(0, 120)}
      </div>
      <div className="mt-6 text-xs leading-none text-stone-500">
        {alternatives} alternatives
      </div>
    </div>
  );
};

const AlternativeCardList: React.FC = () => {
  return (
    <div className="w-full mx-auto py-8 ">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-semibold tracking-tight leading-snug text-neutral-800 ">
          Discover Open Source alternatives to:
        </p>
        <Link href={"/alternatives"}>
          <button className="flex gap-1.5 px-3 py-2 text-sm font-medium leading-none bg-white rounded-md border border-solid border-neutral-200 text-neutral-600">
            <span className="grow">View all alternatives</span>
            <Image
              src="/images/SVG.png"
              alt="alternatives"
              className="object-contain shrink-0 aspect-[1.07] w-[15px]"
              width={200}
              height={200}
            />
          </button>
        </Link>
      </div>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
            <AlternativeCard
              image={item.image}
              title={item.title}
              description={item.description}
              alternatives={item.alternatives}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AlternativeCardList;
