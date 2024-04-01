import "../Style/LandingPage.css";
import React, { useEffect, useState } from "react";
import PaymentsIcon from '@mui/icons-material/Payments';


import Navbar from "./Navbar";
import Footer from "./Footer";
import { listBlog } from "../firebase/getBlogs";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { isAuthenticated } from "../firebase/Authentication";

function LandingPage() {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
  
    isAuthenticated(setIsLoggedIn);
   
  }, []);
  return (
    <div>
      <Navbar />

      <Footer />
    </div>
  );
}

export default LandingPage;
