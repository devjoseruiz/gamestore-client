import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { paymentCartApi } from "../../../../api/cart";

export default function FormPayment(props) {
  const { products, address } = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();
  const { removeAllProductsFromCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      toast.error(result.error.message, {
        theme: "colored",
      });
    } else {
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        address,
        logout
      );

      if (size(response) > 0) {
        toast.success("Order complete!", {
          theme: "colored",
        });
        removeAllProductsFromCart();
        router.push("/orders");
      } else {
        toast.error("Error on processing order", {
          theme: "colored",
        });
      }
    }

    setLoading(false);
  };

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe || loading}>
        Pay
      </Button>
    </form>
  );
}
