import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Divider,
  useTheme,
} from "@mui/material";
import { collection, query, where, orderBy, limit, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import { isAuthenticated } from "../../firebase/Authentication";
import NoAccess from "../pages/ErrorComponents/NoAccess";

const MEMBER_VALUE = 600;

const formatCurrentMonthId = () => {
  const d = new Date();
  return `${d.getFullYear()}_${(d.getMonth() + 1).toString().padStart(2, "0")}`;
};

const MissingSavings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMembers, setSavedMembers] = useState([]);
  const [unsavedMembers, setUnsavedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    fetchSavingsData();
  }, []);

  const fetchSavingsData = async () => {
    setLoading(true);

    // Query incomplete months ordered descending by month ID (document ID)
    const savingsCol = collection(firestore, "savings");
    const q = query(
      savingsCol,
      where("completed", "==", false),
      orderBy("__name__", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    let docId;

    if (!querySnapshot.empty) {
      docId = querySnapshot.docs[0].id;
    } else {
      // fallback to current month if no incomplete month found
      docId = formatCurrentMonthId();
    }

    const docRef = collection(firestore, "savings");
    const monthDocRef = querySnapshot.empty
      ? firestore.collection("savings").doc(docId)
      : querySnapshot.docs[0].ref;

    const docSnap = await monthDocRef.get?.() || await getDoc(monthDocRef);

    if (docSnap.exists()) {
      const members = docSnap.data().members || {};
      const saved = [];
      const unsaved = [];

      Object.entries(members).forEach(([id, m]) =>
        m.saved ? saved.push({ id, ...m }) : unsaved.push({ id, ...m })
      );

      setSavedMembers(saved);
      setUnsavedMembers(unsaved);
    } else {
      // If doc doesn't exist fallback (rare case)
      setSavedMembers([]);
      setUnsavedMembers([]);
    }

    setLoading(false);
  };

  const totalSaved = savedMembers.length * MEMBER_VALUE;
  const totalMissing = unsavedMembers.length * MEMBER_VALUE;

  if (!isLoggedIn) return <NoAccess />;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3, py: 5, maxWidth: 960, mx: "auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#f5faf7",
              borderColor: "#b6e2c1",
            }}
          >
            <Typography variant="body1" fontWeight={500} color="green">
              💚 Total Saved
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
              {totalSaved.toLocaleString()} PLN
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {savedMembers.length} member{savedMembers.length !== 1 && "s"}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#fff5f5",
              borderColor: "#ef9a9a",
            }}
          >
            <Typography variant="body1" fontWeight={500} color="error">
              🔴 Missing Amount
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
              {totalMissing.toLocaleString()} PLN
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {unsavedMembers.length} member{unsavedMembers.length !== 1 && "s"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {unsavedMembers.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography
            variant="subtitle1"
            sx={{ mt: 4, mb: 2, fontWeight: 500, color: "text.secondary" }}
          >
            Members who haven’t saved yet:
          </Typography>
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {unsavedMembers.map((member) => (
              <Chip
                key={member.id}
                label={member.name}
                variant="outlined"
                sx={{
                  bgcolor: "#fff0f0",
                  borderColor: "#f5b5b5",
                  color: "#c62828",
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MissingSavings;
