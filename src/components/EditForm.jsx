import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField  } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { listBlog } from "../firebase/getBlogs";
import InputFileUpload from "./InputComonents/FileUpload";
import { editBlog } from "../firebase/createBlog";

export default function EditForm(props) {
  const [blogs, setBlogList] =useState([])
  const [open, setOpen] = React.useState(false); 
  const [blogToEdit, setBlogToEdit] = useState({})
  const [isUpdated, setIsUpdated] = useState(false)  
  const [error, setError] = useState("");
  

  const handleOpen = () => {
    getblog()
    setOpen(true)
  };

  const getblog = ()=>{ 
    const blog = blogs.filter((blog) => blog.id ===props.id);
    setBlogToEdit(blog)    
  }

  const handleClose = () => {
    setOpen(false)
    setIsUpdated(false)
  };

  const handleUpdate = () => {
    editBlog(blogToEdit,props.id )
    setIsUpdated(true)
  };

  console.log(blogToEdit)

  const HandleEdited = (e)=>{     
      if (error) {
        setError("");
      }
      if (e.target.name === "title") {
        setBlogToEdit({ ...blogToEdit, title: e.target.value });
      }
      if (e.target.name === "body") {
        setBlogToEdit({ ...blogToEdit, body: e.target.value });
      }
  }
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid grey",
    padding: "10px",   
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    listBlog(setBlogList);
  }, []);

  return (
    <div>
      <IconButton onClick={handleOpen} >
        <EditNoteIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ mt: 2 }}>
            {isUpdated ? "Your blog post has been updated successfully!" : "Your blog post:"}
          </Typography>         

          {!isUpdated && <><TextField
            id="outlined-multiline-flexible"            
            fullWidth
            margin="10px"
            padding="10px"
            multiline
            defaultValue= {blogToEdit && blogToEdit.title}
            maxRows={1}
            onChange={(e)=>HandleEdited(e)}
            style={{ marginTop:"10px"}}
            name="title"
          />
          <TextField
            id="outlined-multiline-flexible"            
            fullWidth
            multiline
            defaultValue={blogToEdit && blogToEdit.body}
            maxRows={4}
            onChange={(e)=>HandleEdited(e)}
            style={{ marginTop:"10px"}}
            name="body"
          /></>}
          {!isUpdated && <InputFileUpload />}
          {!isUpdated && <Button variant="contained" onClick={handleUpdate} style={{ margin:"10px",marginLeft:"0px"}}>Update</Button>}
          {isUpdated && <Button variant="contained" onClick={handleClose} style={{ margin:"10px",marginLeft:"0px"}}>Return</Button>}
        </Box>
      </Modal>
    </div>
  );
}
