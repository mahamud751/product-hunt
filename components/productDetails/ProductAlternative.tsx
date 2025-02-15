"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import { getAlternatives } from "@/lib/server-actions";
import { cleanName } from "@/lib/utils";

const AlternativeCard = ({ item }: { item: any }) => {
  const cleanedName = cleanName(item.name);
  return (
    <Link
      href={{
        pathname: `/alternatives/${encodeURIComponent(cleanedName)}`,
        query: { id: item?.id },
      }}
    >
      <div className="flex flex-col items-start px-5 py-6 rounded-lg border border-solid bg-neutral-50 border-neutral-200 transition-transform transform hover:shadow-md hover:border-neutral-300 hover:scale-15">
        <div className="flex gap-3 text-xl font-semibold tracking-tight leading-snug whitespace-nowrap text-neutral-800">
          <button className="box-border flex flex-col justify-center items-center p-1 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
            <Image
              src={item?.logo}
              alt="logo"
              width={1000}
              height={1000}
              className="object-contain w-9 h-9 rounded aspect-square"
            />
          </button>

          <div className="my-auto">{item.name}</div>
        </div>
        <div className="self-stretch mt-5 text-sm leading-5 text-neutral-600 h-[40px]">
          {item?.description?.slice(0, 75)}...
        </div>
        <div className="mt-6 text-xs leading-none text-stone-500">
          {item?.products?.length} alternatives
        </div>
      </div>
    </Link>
  );
};

const ProductAlternative: React.FC = () => {
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const rowsPerPage = 9;

  useEffect(() => {
    const fetchAlternatives = async () => {
      const { alternatives } = await getAlternatives(
        0,
        rowsPerPage,
        undefined,
        undefined
      );
      setAlternatives(alternatives);
    };

    fetchAlternatives();
  }, [rowsPerPage]);

  return (
    <div className="w-full mx-auto py-8 ">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-semibold tracking-tight leading-snug text-neutral-800 ">
          View Alternatives:
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
        {alternatives?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <AlternativeCard item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductAlternative;
