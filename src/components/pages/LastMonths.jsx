import React, { useEffect, useState } from "react";
import { isAuthenticatedDetails } from "../../firebase/Authentication";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoAccess from "./ErrorComponents/NoAccess";
import SavingsMatrix from "./SavingsMatrix";

const LastMonths = () => {
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
      {/* Back Button */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start" }}>
        <Button
          component={Link}
          to="/Dashboard"
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="primary"
          sx={{
            px: 3,
            py: 1,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            boxShadow: 2,
          }}
        >
          Go Back
        </Button>
      </Box>

      {/* Page Title */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        🔄 Monthly Savings Overview
      </Typography>

      {/* Savings Table */}
      <Box>
        <SavingsMatrix />
      </Box>
    </Container>
  );
};

export default LastMonths;
