import React, { useEffect, useState } from "react";
import "../Style/NavBar.css";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../firebase/Authentication";
import SignOutDiaolog from "./SignOut";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LightModeIcon from "@mui/icons-material/LightMode";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
  }, []);

  return (
    <div>
      <nav className="main_nav">
        <div className="menu">
          <h2 className="ngana_logo">
            <Link className="menu_nav" to="/" style={style}>
              <LightModeIcon fontSize="large" style={{ color: "#29b4e2" }} />
              LearnByWriting
            </Link>
          </h2>

          <Link to="/Stories" className="menu_nav" style={style}>
            <AutoStoriesIcon />
            Stories
          </Link>
          <Link className="menu_nav" to="/Blogs" style={style}>
            <LocalLibraryIcon />
            Blogs
          </Link>
          <Link className="menu_nav" to="/Vocabulary" style={style}>
            <FormatListBulletedIcon />
            Vocabulary Lists
          </Link>
          <div className="dropdown" id="dropdown">
            {isLoggedIn ? (
              <Link to="/Dashboard" style={style}>
                <DashboardIcon /> Dashboard
              </Link>
            ) : (
              <Link className="menu_nav dropbtn" to="/Login" id="login" style={style}>
                <LoginIcon />
                Login
              </Link>
            )}

            {isLoggedIn && (
              <div className="dropdown-content hide">
                <Link
                  className="menu_nav dropbtn"
                  to="/User"
                  id="username"
                  style={{ color: "black" }}
                >
                  <PersonIcon />
                  User
                </Link>
                <Link style={style}>
                  <SignOutDiaolog logoutClass="logout" />
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
