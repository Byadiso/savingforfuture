import React, { useEffect, useState } from "react";
import "../Style/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../firebase/Authentication";
import SignOutDiaolog from "./SignOut";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LightModeIcon from "@mui/icons-material/LightMode";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  console.log(location.pathname ==="/Blogs")

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

          <Link to="/Stories" className="" style={style}>
            <AutoStoriesIcon />
            <span className={ location.pathname ==="/Stories"? "active": null}>
            Stories
            </span>
          </Link>
          <Link    to="/Blogs" style={style}>
            
            <LocalLibraryIcon />
            <span className={ location.pathname ==="/Blogs"? "active": null}>Blogs</span>
           
          </Link>
          <Link className="" to="/Vocabulary" style={style}>

            <FormatListBulletedIcon />
            <span className={ location.pathname ==="/Vocabulary"? "active": null}>Vocabulary Lists</span>
          </Link>
          <div className="dropdown" id="dropdown">
            {isLoggedIn ? (
              <Link to="/Dashboard" style={style}>
                <DashboardIcon className="Dashboard_dropdown"/> <span className={ location.pathname ==="/Dashboard"? "active": null}>Dashboard </span>
              </Link>
            ) : (
              <Link  to="/Login" id=" " style={style}>
                <LoginIcon />
                Login
              </Link>
            )}

            {isLoggedIn && (
              <div className="dropdown-content hide">
                <Link
                  className=" dropbtn"
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
