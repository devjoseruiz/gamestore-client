import React, { useState, useEffect } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { getGameApi } from "../api/game";
import { size } from "lodash";
import useCart from "../hooks/useCart";
import CartSummary from "../components/Cart/CartSummary";
import ShippingAddress from "../components/Cart/ShippingAddress";

export default function Cart() {
  const { getProductsFromCart } = useCart();
  const products = getProductsFromCart();

  return !size(products) ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BaseLayout className="empty-cart">
      <h3>The cart is empty</h3>
    </BaseLayout>
  );
}

function FullCart(props) {
  const [reloadCart, setReloadCart] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { products } = props;
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    (async () => {
      const productsTemp = [];

      for await (const product of products) {
        const data = await getGameApi(product);
        productsTemp.push(data);
      }

      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BaseLayout className="cart">
      <CartSummary
        products={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
      <ShippingAddress setSelectedAddress={setSelectedAddress} />
    </BaseLayout>
  );
}
