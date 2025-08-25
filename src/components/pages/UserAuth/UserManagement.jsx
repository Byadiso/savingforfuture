import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore as db } from "../../../firebase/Firebase"; 
import { updateUserRole, checkIfAdminUser } from "../../../firebase/Roles";
import { checkIfAdmin  } from "../../../firebase/Authentication";
import { useNavigate } from "react-router-dom";

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, Typography,
  Button, Box, Snackbar, Alert
} from "@mui/material";
import { getAuth } from "firebase/auth";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentUserUID, setCurrentUserUID] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  // Fetch current user and all users
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setCurrentUserUID(auth.currentUser.uid);
    };
    fetchUsers();
  }, [auth.currentUser]);

  // Handle role change
  const handleRoleChange = async (uid, newRole) => {
    try {
      const isSuperAdmin = checkIfAdmin(currentUserUID);
      const isAdmin = await checkIfAdminUser(currentUserUID);

      if (!isSuperAdmin && !isAdmin) {
        setSnackbarMessage("You are not authorized to update roles!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      await updateUserRole(uid, newRole);
      setUsers(users.map(u => u.id === uid ? { ...u, role: newRole } : u));
      setSnackbarMessage(`Role updated to "${newRole}" for user!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

    } catch (err) {
      console.error("Error updating role:", err.message);
      setSnackbarMessage(`Failed to update role: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "2rem auto" }}>
      {/* Navigation Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/Dashboard")}>
          Back TO DASHBOARD
        </Button>
        <Typography variant="h6">User Management</Typography>
      </Box>

      {/* User Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role || "normal"}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="finance">Finance</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
