import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../firebase/Authentication";
import { Link } from "react-router-dom";
import NoAccess from "./NoAccess";
import { waitToLoad } from "../firebase/Helpers";
import "../Style/Planning.css";

import AddIcon from "@mui/icons-material/Add";

function Planning() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePlan = ()=>{
    console.log("Let start")
  }

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading);
  }, [isLoggedIn]);

  return (
    <div className="main_dashboard">
      <div style={{ paddingTop: "20px", margin: "20px" }}>
        <Link to="/Dashboard"> Go back</Link>
      </div>
      <div style={{ padding: "20px", margin: "20px", color: "black" }}>
        <h4>Welcome to your planning page</h4>
        <div className="main_container_planner">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <p>Start Planning</p> <AddIcon onClick={handlePlan} className="Add_plan"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planning;
