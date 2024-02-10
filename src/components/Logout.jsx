import React, { useEffect, useState } from "react";
import "../Style/user.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { LogoutUser, isAuthenticated } from "../firebase/Authentication";

function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState();
console.log(isLoggedIn)
  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
  }, []);

  const HandleLogOut = () => {
    LogoutUser();
  };

  return (
    <div>
      <Navbar />
      {!isLoggedIn ? (
        <h2>Not logged in</h2>
      
      ) : (
        <div>
          {" "}
          <h2>Are you sure you want to log out ?</h2>
          <div className="logout_button">
            <button id="logout" onClick={HandleLogOut}>
              Yes
            </button>
            <button id="return">
              <Link to="/">Return Home</Link>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Logout;
