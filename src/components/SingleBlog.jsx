import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { listBlog } from "../firebase/getBlogs";
import { FaComment, FaHeart } from "react-icons/fa";
import "../Style/SingleBlog.css";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Collapse,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import styled from "@emotion/styled";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";

function SingleBlog() {
  const [blogList, setBlogList] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  let id = useParams().id.split("id=")[1];

  let blog = blogList.find((blog) => blog.uid_key.toString() === id);
  console.log(blog)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };  

  useEffect(() => {
    listBlog(setBlogList);
  }, []);

  return (
    <div>
      <Navbar />
      {/* <section>
        {blog && (
          <div className="blog_item_content" data-uid={blog.key}>
            <div className="single_blog_image">
              <img src={blog.Image} alt="photo_blog" />
              <div className="icon_blog">
                <p>
                  <FaHeart className="fa" />
                  Like
                </p>
                <p>
                  <FaComment className="fa" />
                  comment
                </p>
              </div>
            </div>

            <h3 className="blog_title">{blog.title}</h3>
            <p className="blog_title">{blog.body}</p>
          </div>
        )}
        </section> */}
        {blog && (
          <Card sx={{ maxWidth: "100%" }}>
         
            <Typography variant="h3" color="text.secondary">
                {blog.title}
              </Typography>
           
            
            <CardMedia
              component="img"
              height="194"
              image={blog.Image}
              alt="photo_blog"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {blog.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>            
              
            </CardActions>
            <CardContent >
            <Typography>{blog.body}</Typography>
              </CardContent>
            
          </Card>
        )}
      
      <Footer />
    </div>
  );
}

export default SingleBlog;
