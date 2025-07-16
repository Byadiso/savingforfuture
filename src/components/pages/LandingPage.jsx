import "../../Style/LandingPage.css";
import React, { useEffect, useState } from "react";
import PaymentsIcon from '@mui/icons-material/Payments';
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../firebase/Authentication";
import { Button, Box, Typography } from "@mui/material";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
  }, []);

  return (
    <Box
      className="main_Landing"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #004e92, #000428)", // deep blue gradient
        color: "#fff",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Your Journey to Smart Saving Starts Here 💰
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        Build your future one step at a time — tap below to begin.
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<PaymentsIcon />}
        component={Link}
        to="/Dashboard"
        sx={{
          backgroundColor: "#ffd54f", // golden yellow
          color: "#000",
          borderRadius: "30px",
          fontWeight: "bold",
          textTransform: "none",
          px: 4,
          py: 1.5,
          boxShadow: 3,
          '&:hover': {
            backgroundColor: "#ffca28",
          },
        }}
      >
        Enter Dashboard
      </Button>
    </Box>
  );
}

export default LandingPage;
