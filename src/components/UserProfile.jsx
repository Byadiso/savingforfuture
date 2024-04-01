import React, { useEffect, useState } from "react";
import { getLoggedUser, isAuthenticated } from "../firebase/Authentication";
import NoAccess from "./NoAccess";
import { Link } from "react-router-dom";

function UserProfile() {
  const [loggedUser, setLoggedUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let email = loggedUser.email;
  let userId = loggedUser.uid;

  useEffect(() => {
    getLoggedUser(setLoggedUser);
    isAuthenticated(setIsLoggedIn);
  }, [isLoggedIn]);

  return (
    <div style={{ display: "flex", alignItems: "center" , color:"white", justifyContent:"center"}}>
      
      <div style={{ display: "flex", alignItems: "center" , color:"white"}}>
        {isLoggedIn ? (
          <div>
            <h1>UserProfile</h1>
            <p>Email: {email && email}</p>
            <p>Uid: {userId && userId}</p>
            <Link to="/" style={{  color:"white"}}>Go back to Home Page</Link>
          </div>
        ) : (
          <NoAccess />
        )}
      </div>
      
    </div>
  );
}

export default UserProfile;
