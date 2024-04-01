import React, { useState } from "react";
import { Button } from "@mui/material";
import InputComponent from "./InputComonents/InputComponent";
import "../Style/Blogs.css";
import { createBlog } from "../firebase/createBlog";
import { isAuthenticated } from "../firebase/Authentication";

import { ValidateBlog, waitToLoad } from "../firebase/Helpers";
import NoAccess from "./NoAccess";

function AddRecord() {  
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [blog, setBlog] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "start  ",
    flexDirection: "column",
    paddingBottom:"50px",
    marginTop:"20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    p: 4,
  };

  const handleOnClick = () => {   
    ValidateBlog(blog,setErrorMessage);
    console.log(errorMessage === null);
    if(errorMessage === null){
      createBlog(blog)   
    }     
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
      setError("");
      setBlog((prevBlog) => ({
        ...prevBlog,
        [name]: value,
      }))
   
    // if (event.target.name === "title") {
    //   setBlog({ ...blog, title: event.target.value });
    // }
    // if (event.target.name === "body") {
    //   setBlog({ ...blog, body: event.target.value });
    // }
      
  };

  React.useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading);
  }, []); // Empty dependency array means this effect runs once on mount
  

  // isAuthenticated(setIsLoggedIn);
  // waitToLoad(setLoading)   

  return (
    <>
     
      <div style={{display:"flex", alignItems:"center"}}>
      {isLoggedIn ? 

      <div style={style} className="Add_blog_container">
        <h2 style={{ color: "white", marginBottom: "50px" }}>
          Create Your Awesome Blog!{" "}
        </h2>
        <>
          <InputComponent name="title" handleChange={handleChange} />
          <InputComponent name="Amount" handleChange={handleChange} />       
        </>
        <>
          
          <Button
            variant="contained"
            onClick={handleOnClick}
            style={{ marginTop: "50px" }}
          >
            Create
          </Button>
        </>
      </div>
      :!loading &&  <NoAccess />}

      </div>
    
    </>
  );
}

export default AddRecord;
