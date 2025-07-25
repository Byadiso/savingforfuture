import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoAccess from "./ErrorComponents/NoAccess";
import SavingsMatrix from "./SavingsMatrix";
import { isAuthenticatedDetails } from "../../firebase/Authentication";

export default function CurrentTransaction() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isAuthenticatedDetails((status) => {
      setIsLoggedIn(status);
      setLoading(false);
    }, setUserId);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <NoAccess />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button - Always visible and prominent */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-start" }}>
        <Button
          component={Link}
          to="/Dashboard"
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: 2,
            boxShadow: 2,
            textTransform: "none",
          }}
        >
          Go Back
        </Button>
      </Box>

      {/* Header */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        📊 Current Monthly Savings Overview
      </Typography>

      {/* Matrix */}
      <SavingsMatrix />
    </Container>
  );
}
