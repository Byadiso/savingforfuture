import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function register() {
  return (
    <div>
        <Navbar />
        <div>
        <section>
      {/* <!-- Services section --> */}
      <div className="service_section">
        {/* <!-- for register --> */}
        <div className="register_content">
          <h1>Start mastering</h1>
          <h5>Create an account to:</h5>

          <p>
            <i className="fa fa-check-circle"></i>
            Start learning with vocabulary lists related to your favorite
            subject, seasonal themes, or the book you’re reading
          </p>

          <p>
            <i className="fa fa-check-circle"></i>
            Create your own custom lists and flashcards to learn the words you
            want to know
          </p>

          <p>
            <i className="fa fa-check-circle"></i>Chart your points, achievements,
            and trouble words
          </p>
          <img src="../images/tellstory.png" width="214px" alt="" />
        </div>
        <div className="register_form" id="register_form">
          <div className="Service_form">
            {/* <h5 id="alert_message_register" className="hide"></h5> */}
            <div className="service_form_item form_login">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
              />

              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
              />
             
              <input
                type="text"
                name="email"
                className="email"
                placeholder="Email"
                id="email-register"
              />
              
              <input
                type="password"
                name="password"
                className="password"
                placeholder="Password"
                id="password-register"
              />
              <p id="error"></p>
              <div className="login_register">
                <input
                  className="register"
                  type="submit"
                  value="Create your account"
                  id="registerSubmit"
                />

                <div className="login_content">
                  <p>Already have an account?</p>
                  <a href=".\login.html">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
        <Footer />
    </div>
  )
}

export default register