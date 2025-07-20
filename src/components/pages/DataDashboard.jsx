import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
  Paper,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GavelIcon from "@mui/icons-material/Gavel";
import UploadDocument from "./UploadDocuments";
import { firestore } from "../../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Optional if using routing

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DataDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [members, setMembers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [docsLoading, setDocsLoading] = useState(true);

  const navigate = useNavigate(); // Optional if using React Router

  useEffect(() => {
    const fetchData = async () => {
      setMembersLoading(true);
      setDocsLoading(true);
      try {
        const [memberSnap, docSnap] = await Promise.all([
          getDocs(collection(firestore, "members")),
          getDocs(collection(firestore, "documents")),
        ]);
        setMembers(memberSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setDocuments(docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setMembersLoading(false);
        setDocsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 6, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        {/* Back Button */}
        <Stack direction="row" justifyContent="flex-start" sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="primary"
            onClick={() => navigate("/dashboard")} // Adjust this route as needed
          >
            Back to Dashboard
          </Button>
        </Stack>

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Data and Documents
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          centered
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 2 }}
        >
          <Tab icon={<GavelIcon />} iconPosition="start" label="Agreements" />
          <Tab icon={<GroupIcon />} iconPosition="start" label="Members" />
          <Tab icon={<DescriptionIcon />} iconPosition="start" label="Documents" />
          <Tab icon={<UploadFileIcon />} iconPosition="start" label="Upload" />
        </Tabs>

        {/* ... TabPanels remain unchanged ... */}
        <TabPanel value={tabIndex} index={0}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            🤝 Agreements & Terms
          </Typography>
          <Typography sx={{ mb: 2 }} color="text.secondary">
            Review your agreements, terms, and conditions here.
          </Typography>
          <MuiLink href="https://example.com/agreement.pdf" target="_blank" underline="hover">
            📄 View Terms and Conditions
          </MuiLink>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            👥 Members ({members.length})
          </Typography>
          {membersLoading ? (
            <Box textAlign="center" py={4}><CircularProgress /></Box>
          ) : members.length === 0 ? (
            <Typography>No members found.</Typography>
          ) : (
            <List>
              {members.map((member) => (
                <React.Fragment key={member.id}>
                  <ListItem>
                    <Avatar sx={{ mr: 2 }}>{member.name?.charAt(0) || "U"}</Avatar>
                    <ListItemText
                      primary={member.name || "Unnamed Member"}
                      secondary={member.email || "No email provided"}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            📄 Uploaded Documents ({documents.length})
          </Typography>
          {docsLoading ? (
            <Box textAlign="center" py={4}><CircularProgress /></Box>
          ) : documents.length === 0 ? (
            <Typography>No documents uploaded yet.</Typography>
          ) : (
            <List>
              {documents.map((doc) => (
                <React.Fragment key={doc.id}>
                  <ListItem>
                    <DescriptionIcon sx={{ color: "primary.main", mr: 2 }} />
                    <ListItemText
                      primary={doc.name || "Unnamed Document"}
                      secondary={
                        <MuiLink href={doc.url} target="_blank" underline="hover">
                          View / Download
                        </MuiLink>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </TabPanel>

        <TabPanel value={tabIndex} index={3}>
          <UploadDocument />
        </TabPanel>
      </Paper>
    </Box>
  );
}
