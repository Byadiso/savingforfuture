import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../firebase/Authentication";
import { checkMyValue } from "../../../Helpers/Helpers";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ProgressBar from "../../InputComonents/ProgressBar";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";

function Login() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (error) setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkMyValue(user, setError, false);

    if (user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
          if (!error) {
            setSuccessMessage("✅ Logged in successfully");
          }
        })
        .catch(() => {
          setError("❌ Invalid email or password");
        });
    }
  };

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    const timeout = setTimeout(() => {
      if (isLoggedIn) {
        navigate("/Dashboard");
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate, isLoggedIn]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      {!isLoggedIn ? (
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            maxWidth: 400,
            width: "100%",
            borderRadius: 3,
            bgcolor: "#ffffff",
          }}
        >
          <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
            Login to Save for the Future
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email or Username"
              variant="outlined"
              name="email"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              margin="normal"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              Log In
            </Button>
          </form>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2">
              Don't have an account yet?{" "}
              <Link to="/Register" style={{ color: "#1976d2", textDecoration: "none" }}>
                Sign Up Here
              </Link>
            </Typography>
            <Typography variant="caption" sx={{ mt: 2, display: "block", color: "gray" }}>
              <Link to="/" style={{ color: "gray", textDecoration: "none" }}>
                savingforthefuture.com
              </Link>
            </Typography>
          </Box>
        </Paper>
      ) : (
        <Box sx={{ textAlign: "center", mt: -8 }}>
          <Typography variant="h6" color="green" gutterBottom>
            {successMessage}
          </Typography>
          <ProgressBar />
        </Box>
      )}
    </Box>
  );
}

export default Login;
