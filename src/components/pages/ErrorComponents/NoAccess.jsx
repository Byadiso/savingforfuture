import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { removeFirstLetter } from "../../../Helpers/Helpers";

export default function NoAccess() {
  const location = useLocation();
  const page = removeFirstLetter(location.pathname);

  return (
    <Box
      sx={{
        height: "70vh",           // reduced height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
        textAlign: "center",
        bgcolor: "#f9fafb",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 360,            // reduced width
        mx: "auto",
        mt: 4,                    // reduced top margin
      }}
    >
      <Typography variant="h1" color="error" sx={{ fontWeight: "bold", mb: 1 }}>
        403
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Access Denied
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        You don't have permission to access{" "}
        <Box
          component="span"
          sx={{ color: "primary.main", fontWeight: "medium" }}
        >
          {page}
        </Box>{" "}
        page!
      </Typography>

      <Button
        component={Link}
        to="/Login"
        variant="contained"
        color="primary"
        size="large"
      >
        Go to Login
      </Button>
    </Box>
  );
}
