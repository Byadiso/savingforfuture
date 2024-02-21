import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Register.css";
import tellstory from "../images/tellstory.png";
import { checkMyValue } from "../firebase/Helpers";
import { isAuthenticated, register } from "../firebase/Authentication";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    if (error) {
      setError("");
    }
    if (event.target.name === "email") {
      setUser({ ...user, email: event.target.value });
    }
    if (event.target.name === "password") {
      setUser({ ...user, password: event.target.value });
    }
    if (event.target.name === "firstname") {
      setUser({ ...user, firstname: event.target.value });
    }
    if (event.target.name === "lastname") {
      setUser({ ...user, lastname: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkMyValue(user, setError, true);
    error === "" &&
      register(user.firstname, user.lastname, user.email, user.password);
    error === "" && setSuccessMessage("Registered in successfully");
    error === "" && navigate("/");
    
  };

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/Register");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div>
      <Navbar />
      <div>
        {/* <section> */}
          <div className="service_section">
            <div className="register_content">
              <h1>Start mastering</h1>
              <h5>Create an account to:</h5>

              <p>
                <i className="fa fa-check-circle"></i>
                Start writing daily, interesting stories full of adventures.
              </p>

              <p>
                <i className="fa fa-check-circle"></i>
                Create your own custom lists and flashcards to learn the words
                you want to know.
              </p>

              <p>
                <i className="fa fa-check-circle"></i>Enjoy reading beautiful stories crafted by Aesop.
              </p>
              <img src={tellstory} width="214px" alt="" />
            </div>
            <div className="register_form" id="register_form">
              <div className="Service_form">
                <div className="service_form_item form_login">
                  <input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    id="firstname"
                    placeholder="First Name"
                  />

                  <input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    id="lastname"
                    placeholder="Last Name"
                  />

                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    className="email"
                    placeholder="Email"
                    id="email-register"
                  />

                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="password"
                    placeholder="Password"
                    id="password-register"
                  />
                  <p id="error">{error === null ? successMessage : error}</p>
                  <div className="login_register">
                    <input
                      className="register"
                      type="submit"
                      onClick={handleSubmit}
                      value="Create your account"
                      id="registerSubmit"
                    />

                    <div className="login_content">
                      <p>Already have an account?</p>
                      <Link to="/login">Login</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* </section> */}
      </div>
      <Footer />
    </div>
  );
}

export default Register;
