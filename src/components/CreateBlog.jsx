import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InputFileUpload from "./InputComonents/FileUpload";

export default function CreateBlog(props) {
  const [open, setOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid grey",
    padding: "10px",
    // margin: "10px",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {    
  }, []);

  return (
    <div>
      
      <Tooltip title="Add a blog">
      <IconButton onClick={handleOpen}>
      <AddIcon style={{ color: "grey" }} />
      </IconButton>
      </Tooltip>    
                 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ mt: 2 }}>
            Create your blog post:
          </Typography>

          <TextField
            id="outlined-multiline-flexible"
            fullWidth            
            padding="10px"
            multiline           
            sx={{ marginTop:"10px",margin:"10px"}}
            maxRows={1}
            name="title"
          />
          <TextField
            id="outlined-multiline-flexible"
            fullWidth
            multiline           
            maxRows={4}
            sx={{ marginTop:"10px"}}
            name="body"
          />
          {!isCreated && <InputFileUpload />}
          <Button variant="contained" style={{ margin:"10px",marginLeft:"0px"}}>Create</Button>
        </Box>
      </Modal>
    </div>
  );
}
