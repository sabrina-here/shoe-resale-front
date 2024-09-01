import React from "react";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "../Components/PaymentCheckout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function Payment() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <div>
        <PageTitle>Payment for</PageTitle>
      </div>

      {/* ---------------------- Payment checkout --------------------------- */}
      <div className="w-96 mx-auto my-20">
        <Elements stripe={stripePromise}>
          <PaymentCheckout data={data}></PaymentCheckout>
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
