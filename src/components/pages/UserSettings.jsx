import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link, useNavigate } from "react-router-dom";

import { isAuthenticated, isAuthenticatedDetails } from "../../firebase/Authentication";
import { readPlans } from "../../firebase/Plan";

import CardBugdeto from "./CardBugdeto";
import UserModal from "../Modals/UserModal";
import NoAccess from "./ErrorComponents/NoAccess";

export default function UserSettings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    isAuthenticatedDetails(setIsLoggedIn, setUserId);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userId) fetchBudgets(userId);
  }, [userId]);

  const fetchBudgets = async (uid) => {
    setLoading(true);
    try {
      const plans = await readPlans(uid);
      const plansArray = Object.keys(plans).map((key) => ({
        id: key,
        ...plans[key],
      }));
      setBudgets(plansArray);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveData = (dropdownValue, textFieldValue) => {
    // Save logic here
    console.log("Saved data:", { dropdownValue, textFieldValue });
    setIsModalOpen(false);
  };

  if (!isLoggedIn) return <NoAccess />;

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 6, px: 2 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/Dashboard"
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="primary"
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* Header & Action */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#1976d2",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          User Settings & Goals
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SettingsIcon />}
          onClick={handleOpenModal}
          sx={{
            bgcolor: "#fff",
            color: "#1976d2",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          Change Settings
        </Button>
      </Paper>

      {/* Content */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Budget Cards */}
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <Grid item xs={12} sm={6} key={budget.id}>
                <CardBugdeto dataExpense={budget.expense} type={budget.type} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                No budget plans found. Click “Change Settings” to add your first plan.
              </Paper>
            </Grid>
          )}

          {/* Info Panel */}
          <Grid item xs={12}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                bgcolor: "#e3f2fd",
                borderRadius: 2,
                textAlign: "center",
                fontWeight: "medium",
                fontSize: "1.1rem",
                color: "#1976d2",
              }}
            >
              Update your financial goals, preferences, and user settings here to tailor
              your dashboard experience.
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Settings Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Change User Settings
        </DialogTitle>
        <DialogContent>
          <UserModal onSave={handleSaveData} onClose={handleCloseModal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={() => {/* Trigger save inside UserModal or lift state */}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
