import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import InputComponent from "../InputComonents/InputComponent";
import { firestore } from "../../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { isAuthenticated } from "../../firebase/Authentication";
import { waitToLoad } from "../../Helpers/Helpers";
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

  const validate = (data) => {
    if (!data.title.trim()) return "Title is required.";
    if (!data.type) return "Type is required.";

    if (data.type !== "member") {
      if (!data.amount || isNaN(data.amount)) {
        return "Valid amount is required.";
      }
    }

    return "";
  };

  const getButtonLabel = () => {
    if (data.type === "member") return "➕ Add Member";
    if (data.type === "interest") return "➕ Add Add-on Interest";
    if (data.type === "charge") return "💸 Add Bank Charge";
    return "💾 Save Entry";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const error = validate(data);
    if (error) {
      setErrorMessage(error);
      setIsSubmitting(false);
      return;
    }

    try {
      const { title, amount, type } = data;

      if (type === "member") {
        await addDoc(collection(firestore, "members"), {
          name: title,
          timestamp: new Date(),
        });
        setSuccessMessage("👤 Member added successfully!");
      } else if (type === "interest") {
        await addDoc(collection(firestore, "add-on-interest"), {
          title,
          amount: Number(amount),
          timestamp: new Date(),
        });
        setSuccessMessage("✨ Add-on interest recorded!");
      } else if (type === "charge") {
        await addDoc(collection(firestore, "bank-charges"), {
          title,
          amount: Number(amount),
          timestamp: new Date(),
        });
        setSuccessMessage("💸 Bank charge logged!");
      } else {
        setErrorMessage("Please select a valid record type.");
        setIsSubmitting(false);
        return;
      }

      setData({ title: "", amount: "", type: "" });

      setTimeout(() => {
        navigate("/Dashboard");
      }, 1200);
    } catch (err) {
      console.error("Error writing to Firestore:", err);
      setErrorMessage("❌ Something went wrong. Try again.");
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
        <Typography variant="h6">Loading...</Typography>
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
        💼 Add What Moves Your Money
      </Typography>
      <Typography align="center" sx={{ mb: 2, color: "gray" }}>
        Add members, add-ons interest, or bank charges to keep your records accurate and current.
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Moved select to top */}
        <FormControl fullWidth required sx={{ mb: 3 }}>
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
            <MenuItem value="member">➕ Add Member</MenuItem>
            <MenuItem value="interest">💸 Add-on Interest</MenuItem>
            <MenuItem value="charge">💸 Bank Charge</MenuItem>
          </Select>
        </FormControl>

        <InputComponent
          name="title"
          label="Title"
          placeholder="e.g. New member: Sarah"
          handleChange={handleChange}
          value={data.title}
          required
        />

        {data.type !== "member" && (
          <InputComponent
            name="amount"
            label="Amount"
            placeholder="e.g. 200 (PLN)"
            handleChange={handleChange}
            value={data.amount}
            type="number"
            required
          />
        )}

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
          {isSubmitting ? "Saving..." : getButtonLabel()}
        </Button>
      </form>
    </Box>
  );
}

export default AddRecord;
