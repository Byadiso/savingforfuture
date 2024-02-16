import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function CreateBlog(props) {
  const [open, setOpen] = React.useState(false);

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
    margin: "10px",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    // listBlog(setBlogList);
  }, []);

  return (
    <div>
      {/* <p onClick={handleOpen}> Create a blog</p> */}
      <Tooltip title="Add a blog">
      <IconButton>
      <AddIcon style={{ color: "grey" }} onClick={handleOpen}/>
      </IconButton>
      </Tooltip>
      {/* <p onClick={handleOpen}> Create a blog</p> */}
                 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ mt: 2 }}>
            Your blog post
          </Typography>

          <TextField
            id="outlined-multiline-flexible"
            fullWidth
            margin="10px"
            padding="10px"
            multiline
            value=""
            maxRows={1}
            name="title"
          />
          <TextField
            id="outlined-multiline-flexible"
            fullWidth
            multiline
            value=""
            maxRows={4}
            name="body"
          />
          <Button variant="contained">Create</Button>
        </Box>
      </Modal>
    </div>
  );
}
