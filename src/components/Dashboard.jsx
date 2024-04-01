import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, ButtonBase, Card, Grid, Paper, Typography } from "@mui/material";
import { listBlog } from "../firebase/getBlogs";
import SkeletonDashboard from "../Skeletons/SkeletonDashboard";
import styled from "@emotion/styled";
import EditForm from "./EditForm";
import CreateBlog from "./CreateBlog";
import DeleteModal from "./DeleteModal";
import { isAuthenticated } from "../firebase/Authentication";
import { Link, useNavigate } from "react-router-dom";
import NoAccess from "./NoAccess";
import { waitToLoad } from "../firebase/Helpers";
import TableData from "./TableData";
import CardBugdeto from "./CardBugdeto";

function Dashboard() {
  const [blogList, setBlogList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let blogNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  useEffect(() => {
    listBlog(setBlogList);
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading)   
    
  }, [navigate, isLoggedIn]);

  return (
    <div>
      <Navbar />
      <div tyle={{display:"flex", alignItems:"center", flexDirection: "row"}}>
        <CardBugdeto />
      </div>
      <div style={{display:"flex", alignItems:"center"}}>
      {isLoggedIn ? 
      <TableData />
      : !loading && <NoAccess />}
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
