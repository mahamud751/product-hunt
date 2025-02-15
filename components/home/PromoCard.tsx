"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { Button, Snackbar, Alert, AlertColor } from "@mui/material";
import { getPromoProducts } from "@/lib/server-actions";

const PromoCard = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  useEffect(() => {
    getPromoProducts().then((data) => {
      setCategories(data.slice(0, 10));
    });
  }, []);

  const handleCopy = async (promoCode: string) => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setMessage(`Copied: ${promoCode}`);
      setSeverity("success");
    } catch (err) {
      setMessage("Failed to copy promo code. Please try again.");
      setSeverity("error");
    }
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-3 mt-4">
      {categories?.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-start px-2 py-1 col-span-4  duration-300 rounded-lg 
    border border-solid bg-neutral-50 border-neutral-200 transition-transform transform hover:shadow-md hover:border-neutral-300 hover:scale-15
    "
        >
          <div className="flex gap-2 justify-between items-center self-stretch w-full max-sm:gap-3">
            <div className="flex gap-3 items-center tracking-tight leading-snug whitespace-nowrap">
              <button className="box-border flex flex-col justify-center items-center p-1 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
                <Image
                  src={product?.logo}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="object-contain w-9 h-9 rounded aspect-square"
                />
              </button>

              <div>
                <h1 className="text-sm font-semibold">{product?.name}</h1>
                <p className="text-gray-500 text-xs md:text-sm pr-2">
                  {product?.headline.slice(0, 20)}
                </p>
              </div>
            </div>

            <Button
              onClick={() => handleCopy(product?.promoCode || "No code")}
              endIcon={<FaCopy className="w-3 h-3" />}
              className="py-[6px] text-xs text-white rounded-[15px] bg-black bg-opacity-90 w-[50px]"
            >
              -{product?.promoOffer}%
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoCard;
