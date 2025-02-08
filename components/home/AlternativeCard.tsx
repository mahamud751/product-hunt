"use client";
import Image from "next/image";
import React from "react";
import { FaCopy } from "react-icons/fa";
import { Button, Container, Grid } from "@mui/material";

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
    <div className="flex flex-col items-start px-5 py-6 rounded-lg border border-solid bg-neutral-50 border-neutral-200">
      <div className="flex gap-3 text-xl font-semibold tracking-tight leading-snug whitespace-nowrap text-neutral-800">
        <Image
          src={image}
          alt="logo"
          width={1000}
          height={1000}
          className="object-contain shrink-0 w-9 rounded-md aspect-square"
        />
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
      <Grid container spacing={3}>
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
