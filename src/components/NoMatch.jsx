import React from "react";
import Navbar from "./pages/Layouts/Navbar";
import Footer from "./pages/Layouts/Footer";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "150px",
        }}
      >
        <p style={{ color: "black" }}> 404 No Match found!</p>
        <Link to="/">
          <p style={{ color: "black" }}>Return to Home Page</p>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default NoMatch;
