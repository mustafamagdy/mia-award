import React from "react";

const Auth = props => (
  <div className="container">
    <div className="login_area">
      <div className="login_block">
        <div className="logo">
          <img src="assets/images/logo_login.png" />
        </div>
        <span>Sign in</span>
        <form action="#">
          <input type="text" placeholder="Name" />
          <input type="password" placeholder="Password" />
          <div className="checkbox">
            <input type="checkbox"className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" for="customCheck1">
              Keep me signed in
            </label>
          </div>
          <div className="submit_area">
            <div className="resset">
              <a href="#" title="#">
                Forget password ?
              </a>
            </div>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <div className="signup_block">
        <span>Sign Up</span>
        <p>
          In order to apply for any award you need be a member in our website and follow all our policies. please signup to start your way
          to the awards
        </p>
        <a href="#" title="#">
          Register
        </a>
      </div>
    </div>
  </div>
);

export default Auth;
