import React from "react";
import '../Style/NavBar.css';

function Navbar() {
  return (
    <div>
      <nav className="main_nav">
        <div className="menu">
          <h2 className="ngana_logo">
            <a href="./index.html" className="menu_nav">
              LearnByWriting
            </a>
          </h2>

          <a href="./page/stories.html" className="menu_nav">
            <i className="fa fa-book"></i>Stories
          </a>
          <a href="./page/blog.html" className="menu_nav">
            <i className="fa fa-globe"></i>Blogs
          </a>
          <a href="./page/vocabulary.html" className="menu_nav">
            <i className="fa fa-list"></i>Vocabulary Lists
          </a>
          <div className="dropdown" id="dropdown">
            <a href="./page/login.html" className="dropbtn" id="username">
              <i className="fa fa-sign-in"></i>Login
            </a>
            <div className="dropdown-content hide">
              <a href="./page/dashboard.html">
                <i className="fa fa-dashboard"></i> Dashboard
              </a>
              <a href="./logout.html">
                {" "}
                <i className="fa fa-sign-out"></i>logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
