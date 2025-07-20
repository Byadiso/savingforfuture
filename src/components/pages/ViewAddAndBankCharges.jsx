import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import ViewAddOns from "./ViewAddOns";
import ViewBankCharges from "./ViewBankCharges";

const ViewAddAndBankCharges = () => {
  const [addOnTotal, setAddOnTotal] = useState(0);
  const [chargeTotal, setChargeTotal] = useState(0);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, px: 3, pb: 6 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/Dashboard"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none" }}
        >
          Back to Dashboard
        </Button>
      </Box>

      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 5 }}
      >
        📈 Financial Summary: Add-ons & Charges Overview
      </Typography>

      {/* Totals */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              bgcolor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 3,
              py: 2,
              transition: "box-shadow 0.3s",
              "&:hover": { boxShadow: 8 },
            }}
          >
            <MonetizationOnIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Total Add-ons
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {addOnTotal.toLocaleString()} PLN
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card
            elevation={3}
            sx={{
              borderRadius: 3,
              bgcolor: "#fce4ec",
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 3,
              py: 2,
              transition: "box-shadow 0.3s",
              "&:hover": { boxShadow: 8 },
            }}
          >
            <AccountBalanceWalletIcon color="error" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                 Total Bank Charges
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="error">
                {chargeTotal.toLocaleString()} PLN
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Add-ons Section */}
      <Box sx={{ mb: 6 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <MonetizationOnIcon color="primary" />
          <Typography variant="h6" fontWeight="medium">
             Add-on Interests
          </Typography>
        </Stack>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <ViewAddOns setTotal={setAddOnTotal} />
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Bank Charges Section */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <AccountBalanceWalletIcon color="error" />
          <Typography variant="h6" fontWeight="medium">
            Bank Charges
          </Typography>
        </Stack>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <ViewBankCharges setTotal={setChargeTotal} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ViewAddAndBankCharges;
