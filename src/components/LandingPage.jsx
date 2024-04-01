import "../Style/LandingPage.css";
import React, { useEffect, useState } from "react";

import writeImage from "../images/write.png";

import {
  FaArrowAltCircleDown,
  FaPenSquare,
  FaBookOpen,
  FaBookReader,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { listBlog } from "../firebase/getBlogs";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { isAuthenticated } from "../firebase/Authentication";

function LandingPage() {
  const [blogList, setBlogList] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  

 
  useEffect(() => {
    listBlog(setBlogList);   
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
