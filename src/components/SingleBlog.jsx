import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { listBlog } from "../firebase/getBlogs";
import { FaComment, FaHeart } from "react-icons/fa";
import "../Style/SingleBlog.css";

function SingleBlog() {
  const [blogList, setBlogList] = useState([]);
  let id = useParams().id.split("id=")[1];

  let blog = blogList.find((blog) => blog.uid_key.toString() === id);

  useEffect(() => {
    listBlog(setBlogList);
  }, []);

  return (
    <div>
      <Navbar />
      <section>
        {blog && (
          <div className="blog_item_content" data-uid={blog.key}>
            <div className="single_blog_image">
              <img src={blog.Image} alt="photo_blog" />
              <div className="icon_blog">
                <p>
                  <FaHeart className="fa" />
                  Like
                </p>
                <p>
                  <FaComment className="fa" />
                  comment
                </p>
              </div>
            </div>

            <h3 className="blog_title">{blog.title}</h3>
            <p className="blog_title">{blog.body}</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default SingleBlog;
