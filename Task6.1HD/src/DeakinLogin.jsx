import React from "react";
import { Link } from "react-router-dom";
import "./DeakinLogin.css";

const DeakinLogin = () => {
  return (
    <div className="dimmed-background">
      {/* Background image */}
      <img
        className="newPhoto"
        src={require('./routes/homepage/images/deakin_uni.jpg')}
        alt="main_image"
      />

      {/* Login prompt card */}
      <div className="login-card">
        <h1 className="text_main">WELCOME TO DEAKIN</h1>
        <p className="text_login">Login to access the Services!</p>
        <Link to='login'>
            <button className="mylogButton" value="Login">
              Login
            </button>
          </Link>
      </div>
    </div>
  );
};

export default DeakinLogin;
