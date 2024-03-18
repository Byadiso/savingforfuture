import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import { listBlog } from "../firebase/getBlogs";
import "../Style/SingleBlog.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScoreIcon from "@mui/icons-material/Score";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CommentIcon from '@mui/icons-material/Comment';
import { isAuthenticated } from "../firebase/Authentication";
import { removePTag } from "../firebase/Helpers";

function SingleBlog() {
  const [blogList, setBlogList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // will redirect to login page if not logged in
  const navigate = useNavigate();

  let id = useParams().id.split("id=")[1];

  let blog = blogList.find((blog) => blog.uid_key.toString() === id);

  let color =["#818181", "#29b4e2","rgb(0, 0, 0)"]
  

  let getTime = (timeStamp)=>{
        const time = new Date(timeStamp);
    var date = ("0" + time.getDate()).slice(-2);
    var yr = time.getFullYear();
    
    var mth = ("0" + (time.getMonth() + 1)).slice(-2);

    var dateDisplay = date + "/" + mth + "/" + yr
    return dateDisplay
  }

  useEffect(() => {
    listBlog(setBlogList);
    isAuthenticated(setIsLoggedIn);
    if (!isLoggedIn) {
      navigate("/Login");
    } else {
      navigate(`/Blogs/id=${id}`);
    }
  }, [navigate, isLoggedIn,id]);

  return (
    <div>
      <Navbar />
      {blog && (
        <Card sx={{ maxWidth: "85%", margin: "50px", marginBottom:"100px" }}>
          <CardMedia
            component="img"
            height="194"
            image={blog.Image}
            alt="photo_blog"
          />
          <CardContent>
            <Typography variant="h4" color={color[2]}>
              {blog.title}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>          

            <ScoreIcon style={{ marginLeft: "60px" }} />
            <Typography
              variant="p"
              color="text.secondary"             
            >
              {" "}
              {blog.body.match(/\b\w+\b/g).length + " Words"}
            </Typography>
            <AccessTimeFilledIcon   style={{ marginLeft: "60px" }}/>
            <Typography
              variant="p"
              color="text.secondary"
            
            >
              {" "}
              {getTime(blog.createdAt)}
            </Typography>
          </CardActions>
          <CardContent style={{margin:"20px", marginBottom:"50px", color:color[1]}}>
            <Typography style={{ color:color[0]}}>{removePTag(blog.body)}</Typography>
          </CardContent>
        </Card>
      )}

      <Footer />
    </div>
  );
}

export default SingleBlog;
