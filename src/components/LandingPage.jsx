import "../Style/LandingPage.css";
import React, { useEffect, useState } from "react";
import PaymentsIcon from '@mui/icons-material/Payments';
import { Link } from "react-router-dom";
import { isAuthenticated } from "../firebase/Authentication";
import { IconButton } from "@mui/material";

function LandingPage() {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
  
    isAuthenticated(setIsLoggedIn);
   
  }, []);
  return (
    <div className="main_Landing">
        <IconButton style={{ color: "white" }}>
          <Link to="/Dashboard" style={{textDecoration:"none", color:"white"}}>
          <PaymentsIcon fontSize="large" />
          </Link>              
             
            </IconButton>
            <h2>Bugdeto </h2>
    </div>
  );
}

export default LandingPage;
