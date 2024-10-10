import React from "react";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "../Components/PaymentCheckout";
import { loadStripe } from "@stripe/stripe-js";
import CopyText from "../Components/CopyText";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function Payment() {
  const data = useLoaderData();
  const {
    brand_name,
    category,
    condition,
    description,
    heel_height,
    location,
    price,
    purchase_year,
    seller_phone,
    shoe_image,
  } = data;
  return (
    <div>
      <div>
        <PageTitle>Payment for</PageTitle>
      </div>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row lg:justify-between">
          <div className="card glass w-80">
            <figure>
              <img src={shoe_image} alt="shoe" />
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">{brand_name}</h2>
              <p className="text-accent font-bold">
                ${price}-{heel_height}-{category}
              </p>
              <p>
                {description}, product in {condition} condition
              </p>
              <p>
                purchased in {purchase_year}, Location: {location}
              </p>
              <p className="font-serif font-bold">call: {seller_phone}</p>
            </div>
          </div>
          {/* ---------------------- Payment checkout --------------------------- */}
          <div>
            <div className=" mx-auto my-20 border-2 border-primary rounded p-8">
              <Elements stripe={stripePromise}>
                <PaymentCheckout data={data}></PaymentCheckout>
              </Elements>
            </div>

            <div>
              <CopyText></CopyText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
