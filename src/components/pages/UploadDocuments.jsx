import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore } from "../../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button, Typography, Box, Input } from "@mui/material";

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

    try {
      const storage = getStorage();
      // You can customize the path & filename as you wish
      const storageRef = ref(storage, `documents/${Date.now()}_${file.name}`);

      // Upload file
      await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Save metadata to Firestore
      await addDoc(collection(firestore, "documents"), {
        name: file.name,
        url: downloadURL,
        createdAt: new Date(),
      });

      setMessage("Document uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload document.");
    }

    setUploading(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3, bgcolor: "#fafafa", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Document (PDF, DOC, etc.)
      </Typography>

      <Input type="file" onChange={handleFileChange} inputProps={{ accept: ".pdf,.doc,.docx,.txt" }} />

      {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}

      <Button
        variant="contained"
        onClick={uploadDocument}
        disabled={uploading}
        sx={{ mt: 2 }}
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </Button>

      {message && (
        <Typography sx={{ mt: 2 }} color={message.includes("successfully") ? "green" : "error"}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
