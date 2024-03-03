import React from "react";
import { Link } from "react-router-dom";

function NoAccess() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" , marginTop: "150px" }}
    >
      <p style={{ color: "black" }}> No Authorized</p>
      <Link to="/Login">
        <p style={{ color: "black" }}>Please login</p>
      </Link>
    </div>
  );
}

export default NoAccess;
