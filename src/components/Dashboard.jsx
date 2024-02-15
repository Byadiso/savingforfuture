import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { listBlog } from "../firebase/getBlogs";
import SkeletonDashboard from "../Skeletons/SkeletonDashboard";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditForm from "./EditForm";

function Dashboard() {
  const [blogList, setBlogList] = useState([]);

  let blogNumber = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  useEffect(() => {
    listBlog(setBlogList);
  }, []);

  return (
    <div>
      <Navbar />

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={8}>
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
                  <Grid container spacing={2}>
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
                        <Grid item  xs={6}>
                          <Typography gutterBottom variant="h6" component="div">
                            {blog.title}
                          </Typography>

                          <Grid item xs={12}>
                            <Tooltip title="Delete">
                              <IconButton>
                                <DeleteIcon style={{color:"pink"}}/>
                              </IconButton>
                            </Tooltip>
                     
                            <Tooltip title="Edit">
                              <IconButton>
                                <EditNoteIcon /> 
                                {/* <EditForm /> */}
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />
                </Paper>
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
                  <a href="./add_blog.html" id="add">
                    <i className="fa fa-plus"></i>Add Blog
                  </a>
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
