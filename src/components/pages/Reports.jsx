import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  useTheme
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { isAuthenticated } from "../../firebase/Authentication";
import { Link } from "react-router-dom";
import NoAccess from "./ErrorComponents/NoAccess";
import { waitToLoad } from "../../Helpers/Helpers";
import { listTransactions } from "../../firebase/getTransactions";
import { filterBenefits } from "../../firebase/Filters";
import MissingSavings from "./OverviewSavings";

function Reports() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const theme = useTheme();

  const { filteredBenefits, totalBenefits } = filterBenefits(transactions);

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading);
    listTransactions(setTransactions);
  }, []);

  if (!isLoggedIn && !loading) return <NoAccess />;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Back Navigation */}
      <Box display="flex" alignItems="center" mb={4}>
        <Link to="/Dashboard" style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton size="small" edge="start">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            Back to Dashboard
          </Typography>
        </Link>
      </Box>

      {/* Report Header */}
      <Typography variant="h4" sx={{ fontWeight: 500, mb: 1 }}>
        Monthly Financial Report
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Overview of savings activity for this month including members who saved and those who haven’t.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Savings Overview */}
      <MissingSavings />

      {/* Future Feature Slots */}
      {/* 
      <Divider sx={{ my: 6 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>💡 Benefits Breakdown</Typography>
      <CardBugdeto data={filteredBenefits} total={totalBenefits} />

      <Divider sx={{ my: 6 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>🧾 All Transactions</Typography>
      <TableData data={transactions} />
      */}
    </Container>
  );
}

export default Reports;
