import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Style.css";
import { Link } from "react-router-dom";

function NoAccess() {
  return (
    <div className="not_found" style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
      <p style={{color: "black"}}> No Authorized</p>
      <Link to="/Login"><p style={{color: "black"}}>Please login</p></Link>
    </div>
  );
}

export default NoAccess;
