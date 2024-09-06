import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PaymentCheckout({ data: booking }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  console.log(booking);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            seller_uid: booking.seller_id,
            customer_uid: booking.customer_id,
            shoe_id: booking.shoe_id,
          },
        },
      }
    );
    if (err) {
      console.log("err: ", err);
    }
    if (paymentIntent?.status === "succeeded") {
      // ------- sending payment confirmation info to database after payment success -----
      const payment = {
        price: booking.shoe_price,
        transactionId: paymentIntent.id,
        bookingId: booking._id,
        shoe_id: booking.shoe_id,
      };
      fetch("https://shoe-resale-server.vercel.app/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setTransactionId(paymentIntent.id);
          setProcessing(true);
          toast.success("Congratulation! your payment is completed");
        });
    }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://shoe-resale-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [booking.shoe_price]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm my-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <div>
        {processing && (
          <p className="text-xl font-bold">Transaction ID: {transactionId}</p>
        )}
      </div>
    </div>
  );
}

export default PaymentCheckout;
