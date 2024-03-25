import React from "react";
import { Link } from "react-router-dom";
import "../Style/Style.css";

function NoAccess() {
  return (
    <div
      className="NoAccessContainer"     
    >
      <h1 style={{ color: "black" }}> 403</h1>
      <h3 style={{ color: "black" }}> Access Denied</h3>
      <p style={{ color: "black" }}>
        {" "}
        You don't have permission to access requested page!
      </p>
      <Link to="/Login">       
        <input className="login" type="submit" value="First login" id="loginSubmit" />
      </Link>
    </div>
  );
}

export default NoAccess;
