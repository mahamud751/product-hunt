"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { Button, Snackbar, Alert, AlertColor } from "@mui/material";

const PromoCard = () => {
  const promoCode = "SAVE20";
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setMessage(`Copied promo code: ${promoCode}`);
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
    <div
      className="rounded-xl text-gray-600 border-[#C1AEFB] border-2 mt-8"
      style={{
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="pt-2  rounded-lg relative">
        <div className="px-5 py-2">
          <div className="flex justify-between">
            <div>
              <Image
                src={
                  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                }
                alt="logo"
                width={1000}
                height={1000}
                className="h-10 w-10 rounded-md"
              />
            </div>

            <div className="flex">
              <div>
                <button className=" flex justify-between px-2 py-1 button  bg-slate-950 hover:bg-indigo-800 rounded-md text-white font-medium text-lg text-center no-underline">
                  <span className="text-sm"> Efficient App</span>
                </button>
              </div>
              <p className="font-bold text-sm ms-4 mt-2"></p>
              <div>
                <button className=" flex justify-between px-2 py-1 button  bg-[#9876ff] text-white font-medium text-lg text-center no-underline">
                  <span className="text-sm"> 50% OFF</span>
                </button>
              </div>
            </div>
          </div>
          <p className="font-bold text-black">MakeADir</p>
          <p>Not all Open Source alternatives are equal</p>
          <div className="flex">
            <p className="text-black font-bold">$10.00</p>
            <p className="ms-1 line-through text-[12px] mt-1">$15.00</p>
          </div>

          <div className="mt-1 flex justify-between">
            <button className=" flex justify-between px-2 py-1 button  bg-slate-950 hover:bg-indigo-800 rounded-md text-white font-medium text-lg text-center no-underline">
              <span className="text-sm">MICROLUNCH50</span>
            </button>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCopy}
                startIcon={<FaCopy />}
                sx={{
                  backgroundColor: "rgb(15 23 42)",
                  "&:hover": {
                    backgroundColor: "rgb(99 102 241)",
                  },
                  borderRadius: "8px",
                  padding: "5px 12px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Use Coupon
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
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
