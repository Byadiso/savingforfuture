import React, { useEffect, useState } from "react";
import { isAuthenticatedDetails } from "../../firebase/Authentication";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoteModal from "../Modals/NoteModal";

import {
  createNote,
  readNotes,
  editNote,
  deleteNote,
} from "../../firebase/Note";

import NoAccess from "./ErrorComponents/NoAccess";

function Planning() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    isAuthenticatedDetails(setIsLoggedIn, setUserId);
  }, []);

  useEffect(() => {
    if (userId) fetchNotes(userId);
  }, [userId]);

  const fetchNotes = async (uid) => {
    const raw = await readNotes(uid);
    if (!raw) return setNotes([]);

    const formatted = Object.keys(raw).map((key) => ({
      id: key,
      ...raw[key],
    }));
    setNotes(formatted);
  };

  const handleAddNewNote = () => {
    setCurrentNote(null);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (newNote) => {
    if (editIndex !== null) {
      await editNote(userId, notes[editIndex].id, newNote);
      const updated = notes.map((n, i) =>
        i === editIndex ? { ...newNote, id: notes[editIndex].id } : n
      );
      setNotes(updated);
    } else {
      await createNote(userId, newNote);
      fetchNotes(userId); // re-fetch to include Firestore-generated ID
    }
    setIsModalOpen(false);
  };

  const handleRemoveNote = async (index) => {
    await deleteNote(userId, notes[index].id);
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 960, mx: "auto" }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Link
          to="/Dashboard"
          style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Go Back</Typography>
        </Link>
      </Box>

      {isLoggedIn ? (
        <>
          <Typography variant="h4" gutterBottom>
            Your Notes
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
              maxWidth: 280,
              mx: "auto",
            }}
            onClick={handleAddNewNote}
          >
            <Typography variant="h6">Add Note</Typography>
            <AddIcon />
          </Paper>

          {notes.length > 0 ? (
            <Grid container spacing={3}>
              {notes.map((note, index) => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      backgroundColor: "#fdfdfd",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 6,
                      },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>{note.title}</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          opacity: 0.85,
                        }}
                      >
                        {note.content}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                      <Tooltip title="Edit Note">
                        <IconButton color="primary" onClick={() => handleEditNote(index)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Note">
                        <IconButton color="error" onClick={() => handleRemoveNote(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
              No notes yet. Start by adding one above.
            </Typography>
          )}

          {isModalOpen && (
            <NoteModal
              closeModal={() => setIsModalOpen(false)}
              saveNote={handleSaveNote}
              currentNote={currentNote}
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
