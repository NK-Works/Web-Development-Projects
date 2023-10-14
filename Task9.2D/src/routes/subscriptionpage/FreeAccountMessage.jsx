import React from "react";
import { Link } from "react-router-dom";
import './FreeAccountMessage.css'

function FreeAccount() {
  return (
    <div className="free-account">
      <h2>You are currently using a Free Account</h2>
      <p>
        With a Free Account, you have access to basic features. Upgrade to a
        Premium plan for full access to our services.
      </p>
      <Link to="/membership">
        <button className="upgrade-button">Upgrade to Premium</button>
      </Link>
    </div>
  );
}

export default FreeAccount;
