import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <section>
        <div className="dashboard_section">
          <div className="dashboard_content">
            <div className="dashboard_item_rigt">
              <div id="blog_admin">
                <img
                  id="loading"
                  src="../images/loading.gif"
                  alt="loading trick"
                  srcSet=""
                  width="100px"
                  margin-bottom="100px"
                />
              </div>

              <div className="add_blog hide" id="form_blog">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Give it an amazing title"
                />

                <textarea
                  type="text"
                  name="body"
                  id="body"
                  placeholder="Add your amazing text here..."
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
                  value="Add Blog"
                  id="addBlog"
                />
              </div>

              {/* <!-- edit form --> */}
              <div className="edit_blog_form hide" id="form_edit">
                <div className="close_overlay_button">
                  <h1>X</h1>
                </div>
                <input
                  type="text"
                  name="title"
                  id="title_update"
                  placeholder="add title"
                />

                <textarea
                  type="text"
                  name="body"
                  id="body_update"
                  placeholder="Add your content here edit"
                ></textarea>

                <input
                  type="file"
                  name="image"
                  id="image_update"
                  placeholder="add image"
                />

                <input
                  className="addBlog add_blog_button"
                  type="submit"
                  value="Update Blog"
                  id="updateBlog"
                />
                <input
                  className="add_blog_button"
                  type="submit"
                  value="Cancel"
                  id="cancel_button"
                />
              </div>
              <h5 id="alert_message_add_blog" className="hide">
                Added successfully
              </h5>
            </div>
            <div className="dashboard_item_left">
              <div className="dashboard_item">
                <div className="dashboard_search">
                  <input type="text" placeholder="Search.." name="search" />
                  <i className="fa fa-search"></i>
                </div>
                <div className="dashboard_categories">
                  <h1>Dashboard</h1>
                  <a href="./add_blog.html" id="add">
                    <i className="fa fa-plus"></i>Add Blog
                  </a>
                  <a href="./user.html" id="info">
                    <i className="fa fa-info"></i>My info
                  </a>
                  <a href="./vocabulary.html" id="members">
                    <i className="fa-solid fa-floppy-disk"></i>Your Vocabulary
                  </a>
                  <a href="./settings.html" id="settings">
                    <i className="fa fa-gear"></i>Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
