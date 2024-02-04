import React from "react";
import '../Style/NavBar.css';
import { FaBook,FaGlobe,FaList, FaDatabase, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

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
          <FaBook />
            Stories
          </a>
          <a href="./page/blog.html" className="menu_nav">
          <FaGlobe />
            Blogs
          </a>
          <a href="./page/vocabulary.html" className="menu_nav">
          <FaList />
           Vocabulary Lists
          </a>
          <div className="dropdown" id="dropdown">
            <a href="./page/login.html" className="dropbtn" id="username">
             <FaSignInAlt />Login
            </a>
            <div className="dropdown-content hide">
              <a href="./page/dashboard.html">
                <FaDatabase /> Dashboard
              </a>
              <a href="./logout.html">
                {" "}
                <FaSignOutAlt />logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
