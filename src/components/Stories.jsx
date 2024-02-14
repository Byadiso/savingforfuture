import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Stories.css";
import { getStories } from "../firebase/APIs";
import loadingImage from "../images/loading.gif";
import StoryBlock from "./StoryBlock";

function Stories() {
  const [storyList, setStoryList] = useState([]);

  const fetchStory = (setStoryList) => {
    getStories().then((Stories) => {
      console.log(Stories.slice(0, 10));
      setStoryList(Stories);
    });
  }; 

  useEffect(() => {   
    fetchStory(setStoryList);    
  }, []);

  return (
    <div>
      <Navbar />
      <section>
        <div className="stories_section">
          <div className="stories_item_content" id="books_item_content">
            {storyList ? (
              storyList.map((story, index) => (
                <StoryBlock
                  key={index}
                  id={story._id}
                  title={story.title}
                  story={story.story}
                  moral={story.moral}
                  author={story.author}
                />
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
          </div>

          {storyList && (
            <button id="load_more_button" className="">
              Load more
            </button>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Stories;
