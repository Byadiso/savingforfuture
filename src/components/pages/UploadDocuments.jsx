import React, { useState } from "react";
import axios from "axios";
import { firestore } from "../../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button, Typography, Box, Input, LinearProgress } from "@mui/material";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/byadiso/auto/upload";
const UPLOAD_PRESET = "saving_for_the_future";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const uploadDocument = async () => {
    if (!file) {
      setMessage("Please select a document to upload.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "documents");

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);

      const downloadURL = res.data.secure_url;

      await addDoc(collection(firestore, "documents"), {
        name: file.name,
        url: downloadURL,
        createdAt: new Date(),
      });

      setMessage("Document uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message || error);
      setMessage("Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        📤 Upload Document (PDF, DOC, etc.)
      </Typography>

      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: ".pdf,.doc,.docx,.txt" }}
        sx={{ mt: 1 }}
      />

      {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}

      <Button
        variant="contained"
        onClick={uploadDocument}
        disabled={uploading}
        sx={{ mt: 2 }}
        fullWidth
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </Button>

      {uploading && <LinearProgress sx={{ mt: 2 }} />}

      {message && (
        <Typography sx={{ mt: 2 }} color={message.includes("successfully") ? "green" : "error"}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
