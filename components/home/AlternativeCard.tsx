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
    <div className="rounded-xl shadow-lg bg-[#FAFAFA] text-gray-600 mt-2">
      <div className="pt-2 rounded-lg relative">
        <div className="px-5 py-2">
          <div className="flex">
            <div>
              <Image
                src={image}
                alt="logo"
                width={1000}
                height={1000}
                className="h-10 w-10 rounded-md"
              />
            </div>
            <p className="font-bold text-md ms-4 mt-2 text-black">{title}</p>
          </div>
          <p className="mt-5">{description}</p>
          <p className="mt-4">{alternatives}</p>
        </div>
      </div>
    </div>
  );
};

const AlternativeCardList: React.FC = () => {
  return (
    <div className="w-4/5 mx-auto px-12 py-8 ">
      <Grid container spacing={4}>
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
