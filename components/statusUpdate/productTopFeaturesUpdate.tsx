import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import { updateProductFlags } from "@/lib/server-actions";

interface ProductFlagsEditorProps {
  productId: string;
  initialVerified: boolean;
  initialTop: boolean;
  initialFeatured: boolean;
}

const ProductFlagsEditor: React.FC<ProductFlagsEditorProps> = ({
  productId,
  initialVerified,
  initialTop,
  initialFeatured,
}) => {
  const [verified, setVerified] = useState(initialVerified);
  const [top, setTop] = useState(initialTop);
  const [featured, setFeatured] = useState(initialFeatured);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProductFlags(productId, { verified, top, featured });
      console.log("Product flags updated successfully");
    } catch (error) {
      console.error("Error updating product flags:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      className="text-white"
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            sx={{
              color: "#2196F3",
              "&.Mui-checked": {
                color: "#2196F3",
              },
            }}
          />
        }
        label="Verified"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={top}
            onChange={(e) => setTop(e.target.checked)}
            sx={{
              color: "#FFD700",
              "&.Mui-checked": {
                color: "#FFD700",
              },
            }}
          />
        }
        label="Top"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            sx={{
              color: "#4CAF50",
              "&.Mui-checked": {
                color: "#4CAF50",
              },
            }}
          />
        }
        label="Featured"
      />
      <Button
        variant="contained"
        onClick={handleSave}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </Box>
  );
};

export default ProductFlagsEditor;
