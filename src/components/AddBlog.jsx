import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "@mui/material";
import InputFileUpload from "./InputComonents/FileUpload";
import TextArea from "./InputComonents/TextArea";
import InputComponent from "./InputComonents/InputComponent";
import "../Style/Blogs.css";

function AddBlog() {
  const [isCreated, setIsCreated] = useState(false);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [error, setError] = useState("");

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

  const handleOnClick = () => {
    // setIsCreated(true);
    console.log(blog)
    console.log("Submitting something.........")
  };

  const handleChange = (event) => {
    if (error) {
      setError("");
    }
    if (event.target.name === "title") {
      setBlog({ ...blog, title: event.target.value });
    }
    if (event.target.name === "body") {
      setBlog({ ...blog, body: event.target.value });
    }
    if (event.target.name === "file") {
      setBlog({ ...blog, URL: event.target.file[0] });
    }
    // console.log(event.target.value)
  };

  console.log(blog);

  return (
    <>
      <Navbar />

      <div style={style} className="Add_blog_container">
        <h2 style={{ color: "#4A4D4E", marginBottom: "50px" }}>
          Create Your Awesome Blog!{" "}
        </h2>
        <>
          <InputComponent name="title" handleChange={handleChange} />
          <TextArea name="body" handleChange={handleChange} />
        </>
        <>
          <InputFileUpload name="image" handleChange={handleChange} />
          <Button
            variant="contained"
            onClick={handleOnClick}
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
