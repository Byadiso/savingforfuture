import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../Style/Stories.css';

function Stories() {
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
            <button id="load_more_button" className="hide">
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
