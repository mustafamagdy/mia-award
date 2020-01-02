import React from "react";
import { Link } from "react-router-dom";

const Login = props => {
  return (
    <div className="hd-left">
      <Link to="/" className="hd-left__logo">
        <img alt="" src="./assets/images/main/logo.png" />
      </Link>
    </div>
  );
};

export default Login;
