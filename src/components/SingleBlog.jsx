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

              <div className="dashboard_item_rigt hide" id="from_edit">
                <div className="add_blog edit_modal" id="form_blog">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="add title"
                  />

                  <textarea
                    type="text"
                    name="body"
                    id="body"
                    placeholder="Add your content here"
                  ></textarea>

                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="add image"
                  />

                  <input
                    className="addBlog add_blog_button"
                    type="submit"
                    value="Update Blog"
                    id="updateBlog"
                  />
                </div>
              </div>

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
