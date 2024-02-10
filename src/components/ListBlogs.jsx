import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { listBlog } from "../firebase/getBlogs";
import loadingImage from "../images/loading.gif";
import BlogBLock from "./BlogBLock";

function ListBlogs() {

  const [blogList, setBlogList] = useState([]);

  console.log(blogList)

  useEffect(() => {
    listBlog(setBlogList);   
    
  }, []);


  return (
    <div>
      <Navbar />
      <section>
        <div className="blog_section">
          <div className="blog_content">
            <div className="blog_item_left">
              <div id="blog_admin">
              {blogList ? (
              blogList.map((blog, index) => (
                <BlogBLock
                  key={index}
                  id={blog.id}
                  body={blog.body}
                  Image={blog.Image}
                  title={blog.title}
                  uid_key={blog.uid_key}
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
