import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../Style/Stories.css';
import { getStories } from "../firebase/APIs";

const RequestLink = "https://shortstories-api.onrender.com/stories";

function Stories() {
 getStories(RequestLink).then(Stories =>{
  console.log(Stories.slice(0,10))
 })
  return (
    <div>
      <Navbar />
      <section>
        <div className="stories_section">
          <div className="stories_item_content" id="books_item_content">
            <img
              id="loading"
              src="../images/loading.gif"
              alt="loading trick"
              srcset=""
              width="100px"
              margin-bottom="100px"
            />
          </div>
          <div>
            <button id="load_more_button" className="">
              Load more
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Stories;
