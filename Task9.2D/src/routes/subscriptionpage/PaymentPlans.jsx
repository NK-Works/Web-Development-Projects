import React, { useState } from "react";
import PaymentWindow from "./PaymentForm";
import "./PaymentPlans.css"; // Import the CSS file

function Plan() {
  const [paymentModal, setPaymentModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState({
    name: "",
    amount: 0,
  });

  const packageHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.id);
    console.log(e.target.value);
    setCurrentPackage({
      name: e.target.name,
      amount: e.target.id,
      productId: e.target.value,
    });
    setPaymentModal(true);
  };

  return (
    <div className="plan-container">
      <h1 className="plan-header">Subscribe to Our Services</h1>
      <p className="plan-description">
        You can get unrestricted access to all our services by selecting a paid plan. You can also continue with the free plan if you wish.
      </p>
      <div className="plan-cards">
        <div className="plan-card">
          <div className="card-header">
            <h2>Basic</h2>
            <div className="plan-price">FREE</div>
          </div>
          <div className="card-content">
            <div className="plan-details">
              For basic usage and serfing. Enjoy the benefits of being a Deakin Student.
            </div>
            <div className="plan-features">
              <div>✓ 1 User</div>
              <div>✓ 10 Comments</div>
              <div>✓ 50 Likes</div>
              <div>✓ 1 Article to Post</div>
              <div>✓ 10 Credits/Invite</div>
            </div>
          </div>
          <br />
          <button
          style={{ marginTop: '40px' }} 
            value="price_1NzR5YSAYf9iHCQbiiqWG20c"
            onClick={(e) => packageHandler(e)}
            id="0"
            name="Free"
            className="plan-button"
          >
            Purchase Free
          </button>
        </div>
        <div className="plan-card">
          <div className="card-header">
            <h2>Pro</h2>
            <div className="plan-price">Rs.399</div>
          </div>
          <div className="card-content">
            <div className="plan-details">
              For people interested in learning more about Deakin and it's facilities.
            </div>
            <div className="plan-features">
              <div>✓ 5 Users</div>
              <div>✓ 1000 Comments</div>
              <div>✓ 10000 Likes</div>
              <div>✓ 5 Article Post</div>
              <div>✓ 100 Credits/Invites</div>
              <div>✓ 10 Questions</div>
            </div>
          </div>
          <br />
          <button 
            style={{ marginTop: '18.9px' }} 
            value="price_1NzR5YSAYf9iHCQb11hxXiC3"
            onClick={(e) => packageHandler(e)}
            id="5"
            name="Pro"
            className="plan-button"
          >
            Purchase Pro
          </button>
        </div>

        <div className="plan-card">
          <div className="card-header">
            <h2>Premium</h2>
            <div className="plan-price">Rs.599</div>
          </div>
          <div className="card-content">
            <div className="plan-details">
              For professionals who are placing their bets of Deakin and its services.
            </div>
            <div className="plan-features">
              <div>✓ 10 Users</div>
              <div>✓ 5000 Comments</div>
              <div>✓ 100000 Likes</div>
              <div>✓ 100 Article Post</div>
              <div>✓ 500 Credits/Invites</div>
              <div>✓ 100 Extra Questions</div>
              <div>✓ Contact Access Anytime</div>
            </div>
          </div>
          <button
            value="price_1NzR5YSAYf9iHCQbJHMhjzB4"
            onClick={(e) => packageHandler(e)}
            id="10"
            name="Premium"
            className="plan-button"
          >
            Purchase Premium
          </button>
        </div>
        </div>
      {/* PaymentWindow Popup */}
      {paymentModal && (
        <div className="payment-overlay">
          <div className="payment-popup">
            <PaymentWindow
              packageName={currentPackage.name}
              amount={currentPackage.amount}
              productId={currentPackage.productId}
              paymentModal={paymentModal}
              setPaymentModal={setPaymentModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Plan;
        