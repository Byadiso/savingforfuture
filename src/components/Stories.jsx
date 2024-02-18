import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Stories.css";
import { getStories } from "../firebase/APIs";
import StoryBlock from "./StoryBlock";
import { Box, Grid } from "@mui/material";
import SkeletonStory from "../Skeletons/SkeletonStory";
import ButtonForAction from "./InputComonents/ButtonForAction";
import StoryFromChatGPT from "./StoryFromChatGPT";
import StoryFunny from "./StoryFunny";

// const RequestLink = "https://shortstories-api.onrender.com/stories";

function Stories() {
  const [storyList, setStoryList] = useState([]);
  const [isChatGpt, setIsChatGpt] = useState(true);
  const [isFun, setIsFun] = useState(false);
  const [isAesop, setIsAesop] = useState(false);

  let storyNumber = ["1", "2", "3", "4", "5", "6"];

  const fetchStory = (setStoryList) => {
    getStories().then((Stories) => {
      setStoryList(Stories);
    });
  };

  const handleAesop = () => {
    setIsAesop(true);
    setIsChatGpt(false);
    setIsFun(false);
    console.log("let open aesop");
  };
  const handleFun = () => {
    setIsFun(true);
    setIsAesop(false);
    setIsChatGpt(false);
    console.log("let open Fun");
  };
  const handleChatGPT = () => {
    setIsChatGpt(true);
    setIsAesop(false);
    setIsFun(false);
    console.log("let open chatGPT");
  };

  useEffect(() => {
    fetchStory(setStoryList);
  }, [isChatGpt, isFun, isAesop]);
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "Row",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <ButtonForAction
          type={"check stories crafted by ChatGPT"}
          action={handleChatGPT}
        />
        <ButtonForAction type={"check Aesop's Fables"} action={handleAesop} />
        <ButtonForAction type={"check something funny"} action={handleFun} />
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
        {isAesop && storyList.length === 0 &&
          storyNumber.map((blogskeleton, index) => (
            <Grid item xs={1} sm={6} md={6} key={index}>
              <SkeletonStory key={index} />
            </Grid>
          ))}
        {isAesop &&
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
        {isChatGpt && <StoryFromChatGPT />}
        {isFun && <StoryFunny />}
      </Grid>
      <Footer />
    </div>
  );
}

export default Stories;
