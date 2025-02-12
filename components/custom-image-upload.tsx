"use client";
import React, { useCallback, useState } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Image from "next/image";

interface LogoUploaderProps {
  endpoint: string;
  onChange: (url: string | null) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ endpoint, onChange }) => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Handle file upload
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Upload file to Cloudinary (or your backend)
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await axios.post<{ secure_url: string }>(
          "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
          data
        );
        const { secure_url } = uploadRes.data;

        // Update state and call `onChange`
        setUploadedFile(secure_url);
        onChange(secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    [onChange]
  );

  // Handle file removal
  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null);
    onChange(null);
  }, [onChange]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        border: "2px dashed #ccc",
        borderRadius: 2,
        padding: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      {uploadedFile ? (
        <>
          <Image
            src={uploadedFile}
            alt="Uploaded Logo"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
            }}
            width={100}
            height={100}
          />
          <IconButton color="error" onClick={handleRemoveFile}>
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 40, color: "#666" }} />
          <Typography variant="body2" color="textSecondary">
            Drag & drop a logo or click to upload
          </Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </>
      )}
    </Box>
  );
};

export default LogoUploader;
