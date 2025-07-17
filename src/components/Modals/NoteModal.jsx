import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 320, sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function NoteModal({ closeModal, saveNote, currentNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title || "");
      setContent(currentNote.content || "");
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    saveNote({
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
    });

    setTitle("");
    setContent("");
  };

  return (
    <Modal open onClose={closeModal}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {currentNote ? "Edit Note" : "Add New Note"}
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            variant="outlined"
            multiline
            rows={5}
            required
          />

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {currentNote ? "Update Note" : "Add Note"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
