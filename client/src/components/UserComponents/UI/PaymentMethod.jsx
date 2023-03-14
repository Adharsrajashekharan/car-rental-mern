import React from "react";

import masterCard from "../../../assets/UserAssets/all-images/master-card.jpg";
import paypal from "../../../assets/UserAssets/all-images/paypal.jpg";
import "../../../styles/UserStyles/payment-method.css";



const PaymentMethod = () => {
  return (
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Cheque Payment
        </label>
      </div>


      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Paypal
        </label>

      </div>
      <div className="payment text-end mt-5">
        <button>Reserve Now</button>
      </div>
    </>
  );
};

export default PaymentMethod;
