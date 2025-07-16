import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import { Typography, Box, CircularProgress } from "@mui/material";

export default function DashboardTotalSaved() {
  const [totalArchivedAmount, setTotalArchivedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArchivedTotals() {
      try {
        const archivesRef = collection(firestore, "archives");
        const snapshot = await getDocs(archivesRef);

        let grandTotal = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (typeof data.amount === "number") {
            grandTotal += data.amount;
          }
        });

        setTotalArchivedAmount(grandTotal);
      } catch (error) {
        console.error("Error fetching archives:", error);
        setTotalArchivedAmount(0); // fallback in case of error
      } finally {
        setLoading(false);
      }
    }

    fetchArchivedTotals();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 480,
        margin: "40px auto",
      }}
    >
      <Typography variant="h6" align="center" sx={{ color: "#222" }}>
        Total Savings
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#000", mt: 1 }}
      >
        {totalArchivedAmount.toLocaleString()} PLN
      </Typography>
    </Box>
  );
}
