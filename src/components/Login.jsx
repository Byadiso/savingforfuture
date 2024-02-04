import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

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
                <p>Login to LearnByWriting.com</p>
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
                <h4><a href="../index.html">LearnByWriting.com</a></h4>
              </div>
            
          </div>
        </div>
 
    </section>
        <Footer />
    </div>
  )
}

export default Login