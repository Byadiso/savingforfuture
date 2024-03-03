import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { listBlog } from "../firebase/getBlogs";
import BlogBLock from "./BlogBLock";

import Box from "@mui/material/Box";
import "../Style/Blogs.css";
import SkeletonBlog from "../Skeletons/SkeletonBlog";
import { Grid } from "@mui/material";
import { isAuthenticated } from "../firebase/Authentication";
import { useNavigate } from "react-router-dom";
import { removePTag } from "../firebase/Helpers";
import NoAccess from "./NoAccess";

function ListBlogs() {
  const [blogList, setBlogList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

// will redirect to login page if not logged in
  const navigate = useNavigate();

  let blogNumber = ["1", "2", "3", "4", "5", "6"];

  useEffect(() => {
    listBlog(setBlogList);
    isAuthenticated(setIsLoggedIn);
    // if (!isLoggedIn) {
    //   navigate("/Login");
    // } else {
    //   navigate("/Blogs");
    // }
  }, [navigate, isLoggedIn]);

  return (
    <div>
      <Navbar />

      {isLoggedIn ? 
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{
            paddingTop: "20px",
            marginBottom: "100px"
          }}
        >
          {blogList.length === 0 &&
            blogNumber.map((blogskeletom, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <SkeletonBlog key={index} />
              </Grid>
            ))}
          {blogList &&
            blogList.map((blog, index) => (
              <Grid item xs={4} sm={4} md={4} key={index} >
                <BlogBLock
                  key={index}
                  id={blog.id}
                  body={removePTag(blog.body)}
                  Image={blog.Image}
                  title={blog.title}
                  uid_key={blog.uid_key}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      : <NoAccess />}
      <Footer />
    </div>
  );
}

export default ListBlogs;
