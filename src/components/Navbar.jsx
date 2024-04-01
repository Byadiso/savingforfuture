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
              <LightModeIcon fontSize="large" style={{ color: "white" }} />
              Bugdeto
            </Link>
          </h2> 
          <Link to="/Dashboard" style={style}>
                <DashboardIcon className="Dashboard_dropdown"/> <span className={ location.pathname ==="/Dashboard"? "": null}>Dashboard </span>
          </Link>   
          <Link
                  className=" dropbtn"
                  to="/User"
                  id="username"
                  style={{ color: "white" }}
                >
                  <PersonIcon />
                  User
                </Link>   
          
          
         
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
