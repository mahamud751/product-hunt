"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { Button, Snackbar, Alert, AlertColor } from "@mui/material";
import { getPromoProducts } from "@/lib/server-actions";
import { Product } from "@/services/types";

const PromoCard = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  useEffect(() => {
    getPromoProducts().then((data) => {
      setCategories(data.slice(0, 10)); // Get the first 10 promo products
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
    <div className="grid grid-cols-1 gap-4">
      {categories?.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-start px-5 py-3 rounded-lg border border-solid bg-neutral-50 border-neutral-200 col-span-4 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <div className="flex gap-5 justify-between items-center self-stretch w-full max-sm:gap-3">
            <div className="flex gap-3 items-center text-xl font-semibold tracking-tight leading-snug whitespace-nowrap text-neutral-800 max-sm:text-base">
              <button className="box-border flex flex-col justify-center items-center p-1.5 w-9 h-9 bg-white rounded-md border border-solid border-neutral-200 max-md:p-1 max-md:w-8 max-md:h-8 max-sm:p-1 max-sm:w-7 max-sm:h-7">
                <Image
                  src={product?.logo || "/default-image.jpg"}
                  alt={product?.name}
                  width={1000}
                  height={1000}
                  className="object-contain w-6 h-6 rounded aspect-square max-md:h-[22px] max-md:w-[22px] max-sm:w-5 max-sm:h-5"
                />
              </button>
              <div>{product?.name}</div>
            </div>
            <div className="">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCopy(product?.promoCode || "No code")}
                endIcon={<FaCopy />}
                className="px-2 py-2 text-xs leading-none text-white whitespace-nowrap rounded bg-black bg-opacity-90 max-sm:px-1.5 max-sm:py-1.5 max-sm:text-xs h-[28px]"
              >
                Get {product?.promoOffer}% OFF
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
          <div className="mt-2 text-sm leading-5 text-neutral-600 max-sm:text-sm">
            {product?.headline?.slice(0, 40) || "No description available"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoCard;
