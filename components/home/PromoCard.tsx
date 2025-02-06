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
    <div
      className="rounded-xl text-gray-600 border-[#C1AEFB] border-2 mt-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-r hover:from-[#f0f4ff] hover:to-[#e3e9ff]"
      style={{
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
        background: "linear-gradient(135deg, #ffffff, #f9fafb)",
      }}
    >
      <div className="pt-2 rounded-lg relative">
        <div className="px-5 py-2">
          <div className="flex justify-between">
            <div className="flex">
              <Image
                src={
                  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                }
                alt="logo"
                width={1000}
                height={1000}
                className="h-10 w-10 rounded-md"
              />
              <p className="font-bold text-black ms-3 mt-2">MakeADir</p>
            </div>

            <div className="flex">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCopy}
                  endIcon={<FaCopy />}
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
                  Get 15% OFF
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

          <p className="mt-1 text-gray-700">
            Not all Open Source alternatives are equal
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
