import React, { useEffect, useState } from "react";
import "../Style/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../firebase/Authentication";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";

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
              <PaymentsIcon fontSize="large" style={{ color: "white" }} />
              Bugdeto
            </Link>
          </h2>
          <Link to="/Dashboard" style={style}>
            <DashboardIcon className="Dashboard_dropdown" />{" "}
            <span className={location.pathname === "/Dashboard" ? "" : null}>
              Dashboard{" "}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
