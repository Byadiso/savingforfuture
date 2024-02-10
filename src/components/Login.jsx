import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import "../Style/login_register.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
        <Navbar />
        <section>
      <div className="service_section">
      
          {/* <!-- for login --> */}
          <div className="service_item_left login_form" id="login_form">
           
              <div className="service_form_item form_login">
                {/* <h5 id="alert_message_login" className="hide"></h5> */}
                <h3>Login to LearnByWriting.com</h3>
                <input
                  type="text"
                  name="email"
                  className="email"
                  placeholder="Email address or Username"
                  id="email_login"
                />
                <input
                  type="password"
                  name="password"
                  className="password"
                  placeholder="Password"
                  id="password_login"
                />
                <p id="error"></p>
                <div className="login_register">
                  <input
                    className="login"
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
                <h4><Link to="/">LearnByWriting.com</Link></h4>
              </div>
            
          </div>
        </div>
 
    </section>
        <Footer />
    </div>
  )
}

export default Login;