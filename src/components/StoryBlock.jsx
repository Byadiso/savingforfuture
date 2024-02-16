import React from "react";
import "../Style/Stories.css";
import { FaVolumeDown } from "react-icons/fa";


function StoryBlock(props) {
  return (
    <div>
      <h3 className="story" data-id={props.id}>
        {props.title}
      </h3>
      <FaVolumeDown className="icon" data-story={props.story.toString()} />

      <p className="story" data-id={props.id}>
        {props.story}
      </p>
      <p className="story" data-id={props.id}>
        <strong> {props.moral}</strong>
      </p>
      <p className="story" data-id={props._id}>
        <em>{props.author}</em>
      </p>
      <hr />
    </div>
  );
}

export default StoryBlock;
