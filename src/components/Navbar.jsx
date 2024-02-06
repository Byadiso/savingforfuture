import React from "react";
import '../Style/NavBar.css';
import { FaBook,FaGlobe,FaList, FaDatabase, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="main_nav">
        <div className="menu">
          <h2 className="ngana_logo">
            <Link to="/" className="menu_nav">
              LearnByWriting
            </Link>
          </h2>

          <Link to="/Stories" className="menu_nav">
          <FaBook />
            Stories
          </Link>
          <Link to="/Blogs" className="menu_nav">
          <FaGlobe />
            Blogs
          </Link>
          <Link to="/vocabulary" className="menu_nav">
          <FaList />
           Vocabulary Lists
          </Link>
          <div className="dropdown" id="dropdown">
            <Link to="/Login" className="dropbtn" id="username">
             <FaSignInAlt />Login
            </Link>
            <div className="dropdown-content hide">
              <Link to="/Dashboard">
                <FaDatabase /> Dashboard
              </Link>
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
