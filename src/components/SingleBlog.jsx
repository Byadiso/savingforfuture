import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SingleBlog() {
  return (
    <div>
      <Navbar />
      <section>
        <div className="blog_section">
          <div className="blog_content single_blog">
            <div className="blog_item_left blog_item_left_single">
              <div className="blog_item_content" id="blog_item_content"></div>

             

              <hr />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default SingleBlog;
