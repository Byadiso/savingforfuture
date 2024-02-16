import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Stories.css";
import { getStories } from "../firebase/APIs";
import loadingImage from "../images/loading.gif";
import StoryBlock from "./StoryBlock";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

// const RequestLink = "https://shortstories-api.onrender.com/stories";

function Stories() {
  const [storyList, setStoryList] = useState([]);

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

      <div className="stories_section">
        <div className="stories_item_content" id="books_item_content">
          {storyList.length === 0 && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 2, sm: 6, md: 12 }}
          >
            {storyList ? (
              storyList.map((story, index) => (
                <Grid item xs={6} key={index}>
                  <StoryBlock
                    id={story._id}
                    number ={index+1}
                    title={story.title}
                    story={story.story}
                    moral={story.moral}
                    author={story.author}
                  />
                </Grid>
              ))
            ) : (
              <img
                id="loading"
                src={loadingImage}
                alt="loading trick"
                srcSet=""
                width="100px"
                margin-bottom="100px"
              />
            )}
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Stories;
