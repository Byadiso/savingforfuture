import React, { useEffect, useState } from "react";
import "../Style/NavBar.css";
import {
  FaBook,
  FaGlobe,
  FaList,
  FaDatabase,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { checkUser, isAuthenticated } from "../firebase/Authentication";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState();



  
  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
  }, []);

  return (
    <div>
      <nav className="main_nav">
        <div className="menu">
          <h2 className="ngana_logo">
            <Link className="menu_nav" to="/">
              LearnByWriting
            </Link>
          </h2>

          <Link to="/Stories" className="menu_nav">
            <FaBook />
            Stories
          </Link>
          <Link className="menu_nav" to="/Blogs">
            <FaGlobe />
            Blogs
          </Link>
          <Link className="menu_nav" to="/Vocabulary">
            <FaList />
            Vocabulary Lists
          </Link>
          <div className="dropdown" id="dropdown">
            {isLoggedIn ? (
              <Link className="menu_nav dropbtn" to="/User" id="username">
                <FaUserAlt />
                User
              </Link>
            ) : (
              <Link className="menu_nav dropbtn" to="/Login" id="login">
                <FaSignInAlt />
                Login
              </Link>
            )}

            {isLoggedIn && (
              <div className="dropdown-content hide">
                <Link className="menu_nav" to="/Dashboard">
                  <FaDatabase /> Dashboard
                </Link>
                <Link className="menu_nav" to="/Logout">
                  {" "}
                  <FaSignOutAlt />
                  logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
