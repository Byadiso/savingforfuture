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
} from "@mui/material";
import UploadDocument from "./UploadDocuments"; // Your existing upload component
import { firestore } from "../../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DataDashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  // Members state
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);

  // Documents state
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      setMembersLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "members"));
        const membersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersList);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
      setMembersLoading(false);
    }

    async function fetchDocuments() {
      setDocsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, "documents"));
        const docsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docsList);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
      setDocsLoading(false);
    }

    fetchMembers();
    fetchDocuments();
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, p: 3, bgcolor: "#f9fafb", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold" sx={{
    bgcolor: "background.paper", // usually white/light background
    color:"grey",
    py: 2,
    borderRadius: 2,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  }}>
        📂 Data Dashboard
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="dashboard tabs"
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Agreements" />
        <Tab label="Members" />
        <Tab label="Documents" />
        <Tab label="Upload Document" />
      </Tabs>

      {/* Agreement Section */}
      <TabPanel value={tabIndex} index={0}>
        {/* You can replace below static content with dynamic if needed */}
        <Typography variant="h6" gutterBottom>
          🤝 Agreement Sections
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Review your agreements, terms, and conditions here. This section can include static text or links to important documents.
        </Typography>
        <Typography>
          Example Agreement:{" "}
          <MuiLink href="https://example.com/agreement.pdf" target="_blank" rel="noopener">
            Terms and Conditions
          </MuiLink>
        </Typography>
      </TabPanel>

      {/* Members Section */}
      <TabPanel value={tabIndex} index={1}>
        <Typography variant="h6" gutterBottom>
          👥 Team Members ({members.length})
        </Typography>
        {membersLoading ? (
          <CircularProgress />
        ) : (
          <List dense>
            {members.map((member) => (
              <React.Fragment key={member.id}>
                <ListItem>
                  <ListItemText primary={member.name || "Unnamed Member"} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            {members.length === 0 && <Typography>No members found.</Typography>}
          </List>
        )}
      </TabPanel>

      {/* Documents Section */}
      <TabPanel value={tabIndex} index={2}>
        <Typography variant="h6" gutterBottom>
          📄 Uploaded Documents ({documents.length})
        </Typography>
        {docsLoading ? (
          <CircularProgress />
        ) : (
          <List dense>
            {documents.map((doc) => (
              <React.Fragment key={doc.id}>
                <ListItem>
                  <ListItemText
                    primary={doc.name || "Unnamed Document"}
                    secondary={
                      <MuiLink href={doc.url} target="_blank" rel="noopener" underline="hover">
                        View / Download
                      </MuiLink>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            {documents.length === 0 && <Typography>No documents uploaded yet.</Typography>}
          </List>
        )}
      </TabPanel>

      {/* Upload Document Section */}
      <TabPanel value={tabIndex} index={3}>
        <UploadDocument />
      </TabPanel>
    </Box>
  );
}
