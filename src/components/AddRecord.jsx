import React, { useState } from "react";
import { Button } from "@mui/material";
import InputComponent from "./InputComonents/InputComponent";
import "../Style/Blogs.css";
import { createTransaction } from "../firebase/Transaction";
import { isAuthenticated } from "../firebase/Authentication";

import { ValidateTransaction, waitToLoad } from "../firebase/Helpers";
import NoAccess from "./NoAccess";
import RadioComponent from "./InputComonents/RadioComponent";

function AddRecord() {  
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [data, setData] = useState({});
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
    ValidateTransaction(data,setErrorMessage);    
    if(errorMessage === null){
      createTransaction(data)   
    }     
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;    
      setError("");
      setData((prevBlog) => ({
        ...prevBlog,
        [name]: value,
      }))   
      
  };

  React.useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading);
  }, []); 
  


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
          <InputComponent name="amount" handleChange={handleChange} />  
          <RadioComponent name="type" handleChange={handleChange} />     
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
