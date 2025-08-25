import React, { useEffect, useState } from "react";
import { checkUser, getLoggedUser, isAuthenticated, useLoggedUser } from "../../firebase/Authentication";
import { Link } from "react-router-dom";
import NoAccess from "./ErrorComponents/NoAccess";
import { waitToLoad } from "../../Helpers/Helpers";
import "../../Style/Dashboard.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MonthlySavingChecklist from "./MonthlySavingChecklist";



function MemberList() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState([]);
    
console.log(loggedUser.email) 

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);    
    waitToLoad(setLoading);
    getLoggedUser(setLoggedUser);
  }, [isLoggedIn]);

  return (
    <div className="main_dashboard">
      <div
        style={{
          paddingTop: "5px",
          margin: "5px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to="/Dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <ArrowBackIcon style={{ marginRight: "5px" }} /> Go back
        </Link>
      </div>
     
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "5px",
        }}
      >
        <div style={{  width: "100%"}}>
                  {isLoggedIn ? (
                    <MonthlySavingChecklist/>
                  ) : (
                    !loading && <NoAccess />
                  )}
                </div>
      </div>
    </div>
  );
}

export default MemberList;
