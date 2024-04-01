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
import {  listVocabularies } from "../firebase/Vocabulary";
import { Link } from "react-router-dom";
import { getStories } from "../firebase/APIs";
import { Button, Grid } from "@mui/material";
import { isAuthenticated } from "../firebase/Authentication";

function LandingPage() {
  const [blogList, setBlogList] = useState([]);
  const [vocabularyList, setVocabularyList] = useState([]);
  const [storyList, setStoryListList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  const blogNumber = blogList.length;
  const vocabularyNumber = vocabularyList.length;
  const storiesNumber = storyList.length;

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: "#29b4e2",
  };

  

  function Stories() {
    getStories().then((Stories) => {
      setStoryListList(Stories);
    });
  }

  useEffect(() => {
    listBlog(setBlogList);
    listVocabularies(setVocabularyList);
    isAuthenticated(setIsLoggedIn);
    Stories();
  }, []);
  return (
    <div>
      <Navbar />
            
      <Footer />
    </div>
  );
}

export default LandingPage;
