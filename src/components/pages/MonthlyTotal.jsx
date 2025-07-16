import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import { Typography, Box, CircularProgress } from "@mui/material";

const MEMBER_VALUE = 600;

export default function MonthlyTotal() {
  const [totalCurrentAmount, setTotalCurrentAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUncompletedSavingsTotals() {
      try {
        const savingsRef = collection(firestore, "savings");
        const snapshot = await getDocs(savingsRef);

        let grandTotal = 0;

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();

          if (data.completed === false && data.members) {
            const members = Object.values(data.members);
            const savedCount = members.filter((m) => m.saved).length;
            grandTotal += savedCount * MEMBER_VALUE;
          }
        });

        setTotalCurrentAmount(grandTotal);
      } catch (error) {
        console.error("Error fetching savings totals:", error);
        setTotalCurrentAmount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchUncompletedSavingsTotals();
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
        Current Total (Ongoing Months)
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#000", mt: 1 }}
      >
        {totalCurrentAmount.toLocaleString()} PLN
      </Typography>
    </Box>
  );
}
