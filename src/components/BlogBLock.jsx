import React from "react";
import "../Style/Blogs.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function BlogBLock(props) {
  const navigate = useNavigate();

  function firstSentence(text) {   
    var sentenceRegex = /^[^.!?]*[.!?]/;
    var sentences = text.match(sentenceRegex);
    return sentences;
  }

  const handleClick = (event) => {
    let id = event.target.dataset.id;
    navigate(`/Blogs/id=${id}`);
  }



  return (
    <Card sx={{ maxWidth: 345, margin: "20px"}}>
      <CardMedia
        data-id={props.uid_key}
        sx={{ height: 140 }}
        image={props.Image}
        title="blog pictures blog"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          data-id={props.uid_key}
        >
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          data-id={props.uid_key}
        >
          {firstSentence(props.body)}
        </Typography>
      </CardContent>
      <CardActions data-id={props.uid_key}>
        <Button size="small" onClick={handleClick} data-id={props.uid_key}>
          {" "}
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogBLock;
