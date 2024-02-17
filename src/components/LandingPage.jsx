import "../Style/LandingPage.css";
import React, { useEffect, useState } from "react";
import tellstory from "../images/tellstory.png";
import writeImage from "../images/write.png";
import readImage from "../images/reading.png";

import {
  FaArrowAltCircleDown,
  FaPenSquare,
  FaGamepad,
  FaBookOpen,
  FaBookReader,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { listBlog, listVocabularies } from "../firebase/getBlogs";
import { Link } from "react-router-dom";
import { getStories } from "../firebase/APIs";
import { Grid } from "@mui/material";

function LandingPage() {
  const [blogList, setBlogList] = useState([]);
  const [vocabularyList, setVocabularyList] = useState([]);
  const [storyList, setStoryListList] = useState([]);

  const blogNumber = blogList.length;
  const vocabularyNumber = vocabularyList.length;
  const storiesNumber = storyList.length;
  const style = {
    display:"flex",justifyContent:"center", alignItems:"center", padding:"20px"
  }

  function Stories() {
    getStories().then((Stories) => {
      setStoryListList(Stories);
    });
  }

  useEffect(() => {
    listBlog(setBlogList);
    listVocabularies(setVocabularyList);
    Stories();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="hero_section">
        <div>
          <h2>I am looking for...</h2>
        </div>
        <div className="hero_section_header">
          <div className="hero_section_header_blue" style={style}>
            <h4 >
              A story to <strong>read</strong>              
            </h4>
            <FaArrowAltCircleDown />
          </div>
          <div className="hero_section_header_red" style={style}>
            <h4>
              A story to <strong>Write</strong>             
            </h4>
            <FaArrowAltCircleDown />
          </div>
          <div className="hero_section_header_green" style={style}>
            <h4>
              A vocabulary to <strong>read</strong>
             
            </h4>
            <FaArrowAltCircleDown />
          </div>
        </div>
      </div>

      <div className="main_content" style={{ backgroundImage: writeImage }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p style={{ color: "#818181" }}>
            "Unleash Brainy-Power! It's like a word carnival! Dive into a
            word-o-rama filled with definitions, examples, and surprises.
            Whether you're unraveling word mysteries or just exploring, join the
            word-party meant for language champs and the etymology-curious!"
          </p>
          <img src={writeImage} alt="wite" style={{ width: "30%", margin:"25px" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
         
          <p style={{ color: "#818181" }}>
            {" "}
            <em>
              "Step into Storyland! Where tales grow like wildflowers (minus the
              pollen!). Get set for adventures that'll whisk you off to
              enchanted worlds. From epic quests to cozy tales, our stories are
              more gripping than a squirrel with a treasure map!"
            </em>
          </p>
        </div>
      </div>

      <div
        className="main_who_static_section"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          color: "white",
        }}
      >
       
        <div className="stat_content">
          <span id="number_blog">{blogNumber}</span>
          <h3 style={{ color: "white" }}>Written blogs</h3>
        </div>
        <div className="stat_content stat_content_middle">
          <span id="number_books">{vocabularyNumber}</span>
          <h3 style={{ color: "white" }}>New words</h3>
        </div>
        <div className="stat_content">
          <span id="number_users">{storiesNumber}</span>
          <h3 style={{ color: "white" }}>Short stories</h3>
        </div>
      </div>

      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 2, sm: 6, md: 12 }}
        style={{
          backgroundColor: "#29b4e2",
          padding: "50px",
          paddingBottom: "150px",
        }}
      >
        <Grid item xs={3} className="service_item">
          <div
            className="app_link banner_and_icon"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <FaPenSquare />
            <Link to="/AddBlog">
              <h3 className="service_title">Write English</h3>
            </Link>
          </div>
        </Grid>
        <Grid item xs={3} className="service_item">
          <div className="app_link banner_and_icon">
            <FaBookReader />
            <Link to="/Vocabulary">
              <h3 className="service_title">New vocabularies</h3>
            </Link>
          </div>
        </Grid>
        <Grid item xs={3} className="service_item">
          <div className="app_link banner_and_icon">
            <FaBookOpen />
            <Link to="/Stories">
              <h3 className="service_title">Stories</h3>
            </Link>
          </div>
        </Grid>
        <Grid item xs={3} className="service_item">
          <div className="app_link banner_and_icon">
            <FaGamepad />
            <Link to="/Games">
              <h3 className="service_title">Play games</h3>
            </Link>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default LandingPage;
