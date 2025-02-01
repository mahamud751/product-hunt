import React from "react";
import { Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import { Status } from "@/services/types";

interface ProductRowProps {
  status: Status;
}

const ProductStatus: React.FC<ProductRowProps> = ({ status }) => {
  let statusIcon;
  let statusColor;

  switch (status) {
    case "ACTIVE":
      statusIcon = <CheckCircleIcon />;
      statusColor = "#4CAF50";
      break;
    case "PENDING":
      statusIcon = <PendingIcon />;
      statusColor = "#FFC107";
      break;
    case "REJECTED":
      statusIcon = <CancelIcon />;
      statusColor = "#F44336";
      break;
    default:
      statusIcon = null;
      statusColor = "#000000";
  }

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: `${statusColor}33`,
        color: "#000000",
        "&:hover": {
          backgroundColor: `${statusColor}66`,
        },
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "5px 16px",
        fontSize: "12px",
        width: 140,
      }}
      startIcon={statusIcon}
    >
      <Box sx={{ flexGrow: 1, textAlign: "left" }}>{status}</Box>
    </Button>
  );
};

export default ProductStatus;
