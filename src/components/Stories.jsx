import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Stories.css";
import { getStories } from "../firebase/APIs";
import StoryBlock from "./StoryBlock";
import { Grid } from "@mui/material";
import SkeletonStory from "../Skeletons/SkeletonStory";

// const RequestLink = "https://shortstories-api.onrender.com/stories";

function Stories() {
  const [storyList, setStoryList] = useState([]);

  let storyNumber = ["1", "2", "3", "4", "5", "6"];

  const fetchStory = (setStoryList) => {
    getStories().then((Stories) => {
      setStoryList(Stories);
    });
  };

  useEffect(() => {
    fetchStory(setStoryList);
  }, []);
  return (
    <div>
      <Navbar />
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 2, sm: 6, md: 12 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "70px",
          paddingTop: "40px",
        }}
      >
        {storyList.length === 0 &&
          storyNumber.map((blogskeleton, index) => (
            <Grid item xs={1} sm={6} md={6} key={index}>
              <SkeletonStory key={index} />
            </Grid>
          ))}
        {storyList &&
          storyList.map((story, index) => (
            <Grid item xs={12} key={index}>
              <StoryBlock
                id={story._id}
                number={index + 1}
                title={story.title}
                story={story.story}
                moral={story.moral}
                author={story.author}
              />
            </Grid>
          ))}
      </Grid>
      <Footer />
    </div>
  );
}

export default Stories;
