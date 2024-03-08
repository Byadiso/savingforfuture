import React from "react";
import { Link } from "react-router-dom";
import "../Style/Style.css";


function NoAccess() {
  return (
    <div
      className="NoAccessContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "150px",
        marginLeft: "350px",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "black" }}> No Authorized</p>
      <Link to="/Login">
        <p style={{ color: "black" }}>Please login</p>
      </Link>
    </div>
  );
}

export default NoAccess;
