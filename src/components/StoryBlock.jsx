import React from "react";
import "../Style/Stories.css";
import { FaVolumeDown } from "react-icons/fa";
import { Card, CardContent, Typography } from "@mui/material";

function StoryBlock(props) {
  return (
    <div>
      <Card sx={{ maxWidth: 850, margin: "10px", marginBottom: "10px", padding:"10px" }}>
        <CardContent>
        <Typography
            gutterBottom
            variant="h4"
            component="div"
            data-id={props.id}
          >
            {props.number}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            data-id={props.story.uid_key}
          >
            {props.title}
          </Typography>
          <FaVolumeDown className="icon" data-story={props.story.toString()} />
          <Typography
            variant="body2"
            color="text.secondary"
            data-id={props.id}
          >
            {props.story}
          </Typography>
          <Typography
            variant="p"
            color="text.secondary"            
            data-id={props.id}        
          >
           <strong>{props.moral}</strong> 
          </Typography>
          <Typography
            variant="body2"
            className="icon"
            data-id={props.id}
          >
             <em> {props.author} </em> 
          </Typography>
        </CardContent>
      </Card>   
    </div>
  );
}

export default StoryBlock;
