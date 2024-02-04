import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ListBlogs() {
  return (
    <div>
      <Navbar />
      <section>
        <div className="blog_section">
          <div className="blog_content">
            <div className="blog_item_left">
              <div id="blog_admin">
                <img
                  id="loading"
                  src="../images/loading.gif"
                  alt="loading trick"
                  srcset=""
                  width="100px"
                  margin-bottom="100px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="button_control" id="button_control"></div>
      </section>
      <Footer />
    </div>
  );
}

export default ListBlogs;
