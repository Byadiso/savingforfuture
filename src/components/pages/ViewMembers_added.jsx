import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { firestore } from "../../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "members"));
        setMembers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Failed to fetch members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        👤 Team Members
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : members.length === 0 ? (
        <Typography>No members found.</Typography>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <List>
            {members.map((member) => (
              <React.Fragment key={member.id}>
                <ListItem>
                  <ListItemText primary={member.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ViewMembers;
