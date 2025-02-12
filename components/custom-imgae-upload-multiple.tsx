"use client";
import React, { useCallback, useState } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Image from "next/image";

interface LogoUploaderProps {
  endpoint: string;
  onChange: (urls: string[]) => void;
}

const ImageUploader: React.FC<LogoUploaderProps> = ({ endpoint, onChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Handle file upload
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      const uploadPromises = files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post<{ secure_url: string }>(
          "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
          data
        );
        return uploadRes.data.secure_url;
      });

      try {
        const uploadedUrls = await Promise.all(uploadPromises);
        setUploadedFiles(uploadedUrls);
        onChange(uploadedUrls);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    },
    [onChange]
  );

  // Handle file removal
  const handleRemoveFile = useCallback(
    (index: number) => {
      const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
      setUploadedFiles(updatedFiles);
      onChange(updatedFiles);
    },
    [uploadedFiles, onChange]
  );

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
      {uploadedFiles.length > 0 ? (
        uploadedFiles.map((file, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Image
              src={file}
              alt={`Uploaded Logo ${index + 1}`}
              style={{
                width: 50,
                height: 50,
                objectFit: "cover",
                borderRadius: 4,
              }}
              width={50}
              height={50}
            />
            <IconButton color="error" onClick={() => handleRemoveFile(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 40, color: "#666" }} />
          <Typography variant="body2" color="textSecondary">
            Drag & drop logos or click to upload
          </Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload Logos
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </Button>
        </>
      )}
    </Box>
  );
};

export default ImageUploader;
