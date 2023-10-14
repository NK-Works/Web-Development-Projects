import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51NzQtbSAYf9iHCQbV53r5jxjnVPkRc20WuP6Yjme2GMhFHkm82fCRwsQS6PIsHLrcAKpXXehZObjjhcSQjtY9rAO00ouNzsP4f";

function PaymentWindow({
  packageName,
  setPaymentModal,
  amount,
  productId,
}) {
  console.log(productId);
  let stripePromise;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(PUBLIC_KEY);
    }

    return stripePromise;
  };

  const item = {
    price: productId,
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "subscription",
    successUrl: `${window.location.origin}/membership/success`,
    cancelUrl: `${window.location.origin}/membership`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log(error);
  };

  const handleClose = () => {
    setPaymentModal(false);
  };

  return (
    <div className="payWinPopUp">
      <div className="closeButton" onClick={() => handleClose()}>
        &#x2715; {/* Close 'x' character */}
      </div>
      {/* Your payment window content here */}
      <div className="packType">{packageName} Package</div> <hr />
      <div className="amountDisplay">
        Rs.{amount}/Mo
      </div> <hr /> <br />
      <button
        className="checkOutButton"
        onClick={() => redirectToCheckout()}
      >
        Checkout Now 
      </button>
    </div>
  );
}

export default PaymentWindow;
