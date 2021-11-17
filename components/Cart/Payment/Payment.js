import React from "react";
import getConfig from "next/config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormPayment from "./FormPayment";

const {
  publicRuntimeConfig: { stripe_token },
} = getConfig();

const stripePromise = loadStripe(stripe_token);

export default function Payment(props) {
  const { products, address } = props;

  return (
    <div className="payment">
      <div className="title">Payment</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
}
