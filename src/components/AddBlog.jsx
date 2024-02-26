import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import InputFileUpload from "./InputComonents/FileUpload";
import TextArea from "./InputComonents/TextArea";
import InputComponent from "./InputComonents/InputComponent";

function AddBlog() {
  const [isCreated, setIsCreated] = useState(false);
  const handleCreate = () => {
    setIsCreated(true);
    console.log("Yes");
  };

  console.log("Yes");

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "start  ",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <>
      <Navbar />

      <div style={style}>
        <h2 style={{color:"#4A4D4E", marginBottom:"50px"}}>Create Your Awesome Blog! </h2>
        <>
          <InputComponent />
          <TextArea />
          
        </>
        <>                
        <InputFileUpload />
        <Button

          variant="contained"
          onClick={handleCreate}
          style={{ marginTop: "50px" }}
        >
          Create
        </Button>
        </>
      </div>

      <Footer />
    </>
  );
}

export default AddBlog;
