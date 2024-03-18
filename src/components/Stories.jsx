import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Stories.css";
import { getStories } from "../firebase/APIs";
import StoryBlock from "./StoryBlock";
import { Grid } from "@mui/material";
import SkeletonStory from "../Skeletons/SkeletonStory";
import ButtonForAction from "./InputComonents/ButtonForAction";
import StoryFromChatGPT from "./StoryFromChatGPT";
import StoryFunny from "./StoryFunny";
import NoConnection from "./NoConnection";

// const RequestLink = "https://shortstories-api.onrender.com/stories";

function Stories() {
  const [storyList, setStoryList] = useState([]);
  const [isChatGpt, setIsChatGpt] = useState(true);
  const [isFun, setIsFun] = useState(false);
  const [isAesop, setIsAesop] = useState(false);
  const [error, setError] = useState();
  const [isActive, setIsActive] = useState(false);

  let storyNumber = ["1", "2", "3", "4", "5", "6"];

  const fetchStory = (setStoryList) => {
    getStories()
      .then((Stories) => {
        setStoryList(Stories);
      })
      .catch((err) => {
        err = { error: err, errorMessage: "Connection error, try again later!"};        
        setError(err.errorMessage);
      });
  };


  const handleAesop = () => {
    setIsAesop(true);
    setIsChatGpt(false);
    setIsFun(false);
    // setIsActive(true);
  };
  const handleFun = () => {
    // setIsActive(true);
    setIsFun(true);
    setIsAesop(false);
    setIsChatGpt(false);
  };
  const handleChatGPT = () => {
    setIsChatGpt(true);
    setIsAesop(false);
    setIsFun(false);
    // setIsActive(true);
  };

  useEffect(() => {
    fetchStory(setStoryList);
  }, [isChatGpt, isFun, isAesop]);
  return (
    <div>
      <Navbar />
      <div id="Story_controllers" style={{}}>
        <ButtonForAction
          type={"Read stories crafted by ChatGPT"}
          handleOnClick={handleChatGPT}
          isActive = {isActive}
        />
        <ButtonForAction
          type={"Read Aesop's Fables"}
          handleOnClick={handleAesop}
          isActive = {isActive}
        />
        <ButtonForAction
          type={"Read something funny"}
          handleOnClick={handleFun}
          isActive = {isActive}
        />
      </div>
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
        { error ? <NoConnection errorMessage={error}/> :  !error && isAesop &&
          storyList.length === 0 &&
          storyNumber.map((index) => (
            <Grid item xs={1} sm={6} md={6} key={index}>
              <SkeletonStory key={index} />
            </Grid>
          ))}
          
        {  isAesop &&
          storyList &&
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
        {!error && isChatGpt && <StoryFromChatGPT />}
        {!error && isFun && <StoryFunny />}
       
      </Grid>
      <Footer />
    </div>
  );
}

export default Stories;
