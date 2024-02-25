import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import InputFileUpload from "./InputComonents/FileUpload";

function AddBlog() {
  const [isCreated, setIsCreated] = useState(false);
  const handleCreate = () => {
    setIsCreated(true);
    console.log("Yes");
  };

  console.log("Yes");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid grey",
    padding: "10px",
    margin: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Navbar />
      <div>
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ mt: 2 }}>
            {isCreated
              ? "Your blog post has been updated successfully!"
              : "Your blog post:"}
          </Typography>

          <>
            <TextField
              id="outlined-multiline-flexible"
              fullWidth
              margin="10px"
              padding="10px"
              multiline
              maxRows={1}
              style={{ marginTop: "10px" }}
              name="title"
            />
            <TextField
              id="outlined-multiline-flexible"
              fullWidth
              multiline
              maxRows={4}
              style={{ marginTop: "10px" }}
              name="body"
            />
          </>
          <InputFileUpload />
          <Button
            variant="contained"
            onClick={handleCreate}
            style={{ margin: "10px", marginLeft: "0px" }}
          >
            Create
          </Button>
        </Box>
        <Footer />
      </div>
    </>
  );
}

export default AddBlog;
