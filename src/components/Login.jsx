import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/login_register.css";
import { Link, useNavigate} from "react-router-dom";
import { isAuthenticated, login } from "../firebase/Authentication";
import { checkMyValue } from "../firebase/Helpers";

function Login() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // const [userId, setUserId] = useState();

  console.log(isLoggedIn)

  const navigate = useNavigate();


 
  const handleChange = (event) => {
    if(error){
      setError('')
    }
    if (event.target.name === "email") {
      setUser({ ...user, email: event.target.value });
    }
    if (event.target.name === "password") {
      setUser({ ...user, password: event.target.value });
    }
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();    
    checkMyValue(user, setError);   
    login(user.email, user.password);
    setSuccessMessage("Logged in successfully")
    navigate("/Login");
  };

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/Login");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div>
      <Navbar />
      <section>
       
        {!isLoggedIn && <div className="service_section">         
          <div className="service_item_left login_form" id="login_form">
          {successMessage && <p>{successMessage}</p>}
            <div className="service_form_item form_login">      
              <h3>Login to LearnByWriting.com</h3>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                className="email"
                placeholder="Email address or Username"
                id="email_login"
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="password"
                placeholder="Password"
                id="password_login"
              />
              <p id="error">{error}</p>
              <div className="login_register">
                <input
                  className="login"
                  onClick={handleSubmit}
                  type="submit"
                  value="login"
                  id="loginSubmit"
                />
                <p>Don't have an account yet?</p>
                <a href=".\register.html">
                  Sign Up. It's free and takes seconds.
                </a>
              </div>
            </div>
            <div className="bottom_login">
              <h4>
                <Link to="/">LearnByWriting.com</Link>
              </h4>
            </div>
          </div>
        </div>}
        
      </section>
      <Footer />
    </div>
  );
}

export default Login;
