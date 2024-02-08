import React from "react";
import '../Style/NavBar.css';
import { FaBook,FaGlobe,FaList, FaDatabase, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Link, Route, Routes } from 'react-router-dom';
import Stories from "./Stories";
import ListBlogs from "./ListBlogs";
import Dashboard from "./Dashboard";
import Vocabulary from "./Vocabulary";
import LandingPage from "./LandingPage";
import Login from "./Login";

function Navbar() {
  return (
    <div>
      <nav className="main_nav">
        <div className="menu">
          <h2 className="ngana_logo">
            <Link className="menu_nav"  to="/" >
              LearnByWriting
            </Link>
          </h2>

          <Link  to="/Stories" className="menu_nav" >
          <FaBook />
            Stories
          </Link>
          <Link className="menu_nav" to="/Blogs" >
          <FaGlobe />
            Blogs
          </Link>
          <Link className="menu_nav" to="/Vocabulary" >
          <FaList />
           Vocabulary Lists
          </Link>
          <div className="dropdown" id="dropdown">
            <Link className="menu_nav dropbtn" to="/Login"  id="username">
             <FaSignInAlt />Login
            </Link>
            <div className="dropdown-content hide">
              <Link className="menu_nav" to="/Dashboard">
                <FaDatabase /> Dashboard
              </Link>
              <Link className="menu_nav" to="/Logout">
                {" "}
                <FaSignOutAlt />logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
     
    </div>
  );
}

export default Navbar;
