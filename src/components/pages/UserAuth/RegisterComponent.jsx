import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../../firebase/Firebase";
import { checkMyValue } from "../../../Helpers/Helpers";
import { isAuthenticated } from "../../../firebase/Authentication";
import ProgressBar from "../../InputComonents/ProgressBar";
import "../../../Style/Register.css";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

// Define admin emails
const adminEmails = ["admin@example.com"]; // Replace with your real admin email(s)

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    if (error) setError("");
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    checkMyValue(user, setError, true);

    const { firstname, lastname, email, password } = user;
    const Auth = getAuth();
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
      const createdUser = userCredential.user;
      const userData = {
        firstname,
        lastname,
        email,
        displayName: firstname,
      };

      await setDoc(doc(db, "users", createdUser.uid), userData);
      setIsLoggedIn(true);
      setSuccessMessage("Registered successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const Auth = getAuth();
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserEmail(user.email || "");
        setIsAdmin(adminEmails.includes(user.email));
        setIsLoggedIn(true);
      } else {
        setIsAdmin(false);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn && successMessage) {
      setTimeout(() => navigate("/"), 5000);
    }
  }, [navigate, isLoggedIn, successMessage]);

  return (
    <Box className="register_main" sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      {!isLoggedIn ? (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400 }}>
          <Typography variant="h6" align="center" color="textPrimary">
            🔒 Please log in to access registration
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Only administrators can create new accounts.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </Box>
        </Paper>
      ) : isAdmin ? (
        <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstname"
              fullWidth
              margin="normal"
              value={user.firstname}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastname"
              fullWidth
              margin="normal"
              value={user.lastname}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={user.password}
              onChange={handleChange}
              required
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            {successMessage && (
              <Typography color="green" variant="body2" sx={{ mt: 1 }}>
                {successMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Create Your Account
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </form>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400 }}>
          <Typography variant="h6" color="error" align="center">
            🚫 Registration Restricted
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Please contact the administrator if you need an account.
          </Typography>
        </Paper>
      )}

      {isLoggedIn && successMessage && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography color="green" sx={{ mb: 2 }}>
            {successMessage}
          </Typography>
          <ProgressBar />
        </Box>
      )}
    </Box>
  );
}

export default Register;
