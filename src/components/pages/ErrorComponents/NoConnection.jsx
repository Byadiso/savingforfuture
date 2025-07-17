import React from "react";
import SignalWifiBadIcon from "@mui/icons-material/SignalWifiBad";
import { Box, Typography, Button } from "@mui/material";

function NoConnection({ errorMessage, onRetry }) {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        mx: "auto",
        maxWidth: 400,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <SignalWifiBadIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Connection Issue
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {errorMessage || "Unable to connect to the internet. Please check your connection and try again."}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
}

export default NoConnection;
