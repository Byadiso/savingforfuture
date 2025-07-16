import React, { useEffect, useState } from "react";
import { isAuthenticated, isAuthenticatedDetails } from "../../firebase/Authentication";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BudgetModal from "../Modals/BudgetModal";
import { createPlan, readPlans, editPlan, deletePlan } from "../../firebase/Plan";
import { getCardStyle, getCurrentMonthName, getTotalStyle, totalPlanBugdet } from "../../Helpers/Helpers";
import ArchivePlanButton from "./ArchivePlans";
import NoAccess from "./ErrorComponents/NoAccess";

function Planning() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const currentMonth = getCurrentMonthName();

  useEffect(() => {
    isAuthenticatedDetails(setIsLoggedIn, setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBudgets(userId);
    }
  }, [userId]);

  const fetchBudgets = async (userId) => {
    const plans = await readPlans(userId);
    if (!plans) {
      setBudgets([]);
      return;
    }
    const plansArray = Object.keys(plans).map((key) => ({
      id: key,
      ...plans[key],
    }));
    setBudgets(plansArray);
  };

  const handleAddNewPlan = () => {
    setCurrentBudget(null);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleEditBudget = (index) => {
    setCurrentBudget(budgets[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleAddOrEditBudget = async (newBudget) => {
    if (editIndex !== null) {
      await editPlan(userId, budgets[editIndex].id, newBudget);
      const updatedBudgets = budgets.map((budget, index) =>
        index === editIndex ? { ...newBudget, id: budgets[editIndex].id } : budget
      );
      setBudgets(updatedBudgets);
    } else {
      await createPlan(userId, newBudget);
      setBudgets([
        ...budgets,
        { ...newBudget, id: Math.floor(Math.random() * 1000000) },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveBudget = async (index) => {
    await deletePlan(userId, budgets[index].id);
    const updatedBudgets = budgets.filter((_, i) => i !== index);
    setBudgets(updatedBudgets);
  };

  const totalAmount = totalPlanBugdet(budgets);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: "auto" }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Link to="/Dashboard" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography variant="body1" component="span">Go Back</Typography>
        </Link>
      </Box>

      {isLoggedIn ? (
        <>
          <Typography variant="h4" gutterBottom>
            Planning for <Box component="span" color="success.main">{currentMonth}</Box>
          </Typography>

          <Typography variant="h5" sx={{ mb: 4, ...getTotalStyle(totalAmount) }}>
            Total Budget: {totalAmount} PLN
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": { bgcolor: "primary.dark" },
              maxWidth: 300,
              mx: "auto",
            }}
            onClick={handleAddNewPlan}
          >
            <Typography variant="h6">Start Planning</Typography>
            <AddIcon />
          </Paper>

          {budgets.length > 0 ? (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {budgets.map((budget, index) => (
                <Grid item xs={12} sm={6} md={4} key={budget.id}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      backgroundColor: getCardStyle(budget.category)?.backgroundColor || "#f5f5f5",
                      color: getCardStyle(budget.category)?.color || "#000",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>{budget.name}</Typography>
                      <Typography variant="body1">Amount: <strong>{budget.amount} PLN</strong></Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Category: {budget.category}</Typography>
                    </Box>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                      <Tooltip title="Edit Budget">
                        <IconButton color="primary" onClick={() => handleEditBudget(index)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove Budget">
                        <IconButton color="error" onClick={() => handleRemoveBudget(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
              No plans yet. Start by adding a budget.
            </Typography>
          )}

          

          {isModalOpen && (
            <BudgetModal
              closeModal={() => setIsModalOpen(false)}
              addOrEditBudget={handleAddOrEditBudget}
              currentBudget={currentBudget}
            />
          )}
        </>
      ) : (
        <NoAccess />
      )}
    </Box>
  );
}

export default Planning;
