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
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [blogList, setBlogList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();


  console.log(isLoggedIn)
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

    if (!isLoggedIn) {
      navigate("/Login");
    } else {
      navigate("/Dashboard");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={8} style={{ marginBottom: "70px" }}>
            {blogList.length === 0 &&
              blogNumber.map((blogskeletom, index) => (
                <Paper
                  sx={{
                    p: 1,
                    margin: "auto",
                    maxWidth: 1000,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <SkeletonDashboard key={index} />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            {blogList &&
              blogList.map((blog, index) => (
                <Card
                  sx={{
                    p: 1,
                    margin: "20px",
                    maxWidth: 1000,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                  key={index}
                >
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={4}>
                      <ButtonBase
                        sx={{ width: 100, height: 100, borderRadius: "50%" }}
                      >
                        <Img alt="image-blog" src={blog.Image} />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                      <Grid
                        item
                        xs={8}
                        container
                        direction="column"
                        spacing={1}
                      >
                        <Grid item xs={6}>
                          <Typography gutterBottom variant="h6" component="div">
                            {blog.title}
                          </Typography>

                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <DeleteModal id={blog.id} />
                            <EditForm id={blog.id} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              ))}
          </Grid>

          <Grid item xs={3}>
            <div className="dashboard_item_left">
              <div className="dashboard_item">
                <div className="dashboard_search">
                  <input type="text" placeholder="Search.." name="search" />
                  <i className="fa fa-search"></i>
                </div>
                <div className="dashboard_categories">
                  <h1>Dashboard</h1>
                            <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                            <CreateBlog /> <p>Add a blog</p>
                            </div>
                 

                  <a href="./user.html" id="info">
                    <i className="fa fa-info"></i>My info
                  </a>
                  <a href="./vocabulary.html" id="members">
                    <i className="fa-solid fa-floppy-disk"></i>Your Vocabulary
                  </a>
                  <a href="./settings.html" id="settings">
                    <i className="fa fa-gear"></i>Settings
                  </a>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}

export default Dashboard;
