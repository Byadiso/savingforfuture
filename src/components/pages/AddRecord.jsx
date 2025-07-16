import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";
import InputComponent from "../InputComonents/InputComponent";
import { createTransaction } from "../../firebase/Transaction";
import { isAuthenticated } from "../../firebase/Authentication";
import { ValidateTransaction, waitToLoad } from "../../Helpers/Helpers";
import NoAccess from "./ErrorComponents/NoAccess";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddRecord() {
  const [data, setData] = useState({
    title: "",
    amount: "",
    type: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading);
  }, []);

  const handleChange = (event) => {
    setErrorMessage("");
    setSuccessMessage("");
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const error = ValidateTransaction(data);
    setErrorMessage(error);

    if (!error) {
      try {
        await createTransaction(data);
        setSuccessMessage("🎉 Success! Your record was added.");
        setData({ title: "", amount: "", type: "" });
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1200);
      } catch (err) {
        setErrorMessage("Oops! Something went wrong.");
        console.error("Error creating transaction:", err);
      }
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography variant="h6">Loading your vault...</Typography>
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <NoAccess />;
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 4,
        bgcolor: "#f9fafc",
        borderRadius: 3,
        boxShadow: 4,
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Back link */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Link
          to="/Dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#0072e5",
            fontWeight: "bold",
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back to Dashboard
        </Link>
      </Box>

      {/* Title */}
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        🧾 Add Something Meaningful
      </Typography>
      <Typography align="center" sx={{ mb: 2, color: "gray" }}>
        Log a member, goal, or special contribution to your journey.
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <InputComponent
          name="title"
          label="Title"
          placeholder="e.g. New member: Sarah"
          handleChange={handleChange}
          value={data.title}
          required
        />

        <InputComponent
          name="amount"
          label="Amount"
          placeholder="e.g. 200 (PLN)"
          handleChange={handleChange}
          value={data.amount}
          type="number"
          required
        />

        <FormControl fullWidth required sx={{ mt: 2 }}>
          <InputLabel id="type-label">Select Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={data.type}
            label="Select Type"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Select one</em>
            </MenuItem>
            <MenuItem value="income">👤 Team Member</MenuItem>
            <MenuItem value="expense">🎯 Goal Amount</MenuItem>
            <MenuItem value="extra">✨ Other Contribution</MenuItem>
          </Select>
        </FormControl>

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 4, py: 1.5 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "🚀 Add to Vault"}
        </Button>
      </form>
    </Box>
  );
}

export default AddRecord;
