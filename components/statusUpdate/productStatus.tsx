import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
  Typography,
  Box,
} from "@mui/material";
import { Status } from "@/app/services/types";
import { updateProductStatus } from "@/lib/server-actions";

interface ProductStatusUpdaterProps {
  productId: string;
  status: Status;
}

const ProductStatusUpdater: React.FC<ProductStatusUpdaterProps> = ({
  productId,
  status,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(status);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  const handleStatusChange = (event: SelectChangeEvent<Status>) => {
    const newStatus = event.target.value as Status;
    setSelectedStatus(newStatus);
  };

  const handleUpdateStatus = async () => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await updateProductStatus(productId, selectedStatus);
      setSuccessMessage("Status updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#28292D", p: 3, borderRadius: "8px" }}>
      <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 2 }}>
        Update Product Status
      </Typography>
      <FormControl fullWidth>
        <InputLabel
          id="status-select-label"
          sx={{ color: "#FFFFFF", "&.Mui-focused": { color: "#FFFFFF" } }}
        >
          Status
        </InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={selectedStatus}
          label="Status"
          onChange={handleStatusChange}
          sx={{
            color: "#FFFFFF",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#393A3F",
            },
            "& .MuiSvgIcon-root": {
              color: "#FFFFFF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4CAF50",
            },
          }}
        >
          <MenuItem value={Status.PENDING}>Pending</MenuItem>
          <MenuItem value={Status.ACTIVE}>Active</MenuItem>
          <MenuItem value={Status.REJECTED}>Rejected</MenuItem>
        </Select>
      </FormControl>
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          onClick={handleUpdateStatus}
          disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>

      {successMessage && (
        <Typography variant="body2" sx={{ color: "#4CAF50", mt: 2 }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body2" sx={{ color: "#FF0000", mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ProductStatusUpdater;
