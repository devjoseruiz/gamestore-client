import getConfig from "next/config";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

const {
  publicRuntimeConfig: { stripe_token },
} = getConfig();

const stripePromise = loadStripe(stripe_token);

export default function Payment(props) {
  const { products, address } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Doing payment!");
  };

  return (
    <div className="payment">
      <div className="title">Payment</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <form className="payment-form" onSubmit={handleSubmit}>
            <CardElement />
            <Button type="submit">Pay</Button>
          </form>
        </Elements>
      </div>
    </div>
  );
}
