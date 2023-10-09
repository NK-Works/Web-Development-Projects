import React from "react";
import './PaymentSuccess.css'

function Success() {
  return (
    <div className="success-overlay">
      <div className="success-card">
        <div className="success-message"> <hr style={{ marginBottom: '4 px' }} /> Payment Success ! <hr /></div>
        <svg
          className="success-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1024 1024"
        >
          
        </svg>
        <a href="/" className="back-link">
          <button className="back-button">Back to Home</button>
        </a>
      </div>
    </div>
  );
}

export default Success;
