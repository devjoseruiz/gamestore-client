import getConfig from "next/config";
import { authFetch } from "./token";
import { size, includes, remove } from "lodash";
import { toast } from "react-toastify";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export function getProductsFromCartApi() {
  const cart = localStorage.getItem("cart");

  if (!cart) return [];

  const products = cart.split(",");
  return products;
}

export function addProductToCartApi(product) {
  const cart = getProductsFromCartApi();

  if (!cart) localStorage.setItem("cart", product);
  else {
    const productFound = includes(cart, product);

    if (!productFound) {
      cart.push(product);
      localStorage.setItem("cart", cart);
      toast.success("Product added to the cart!", {
        theme: "colored",
      });
    } else {
      toast.warning("Product already is in the cart", {
        theme: "colored",
      });
    }
  }
}

export function countProductsInCartApi() {
  const cart = getProductsFromCartApi();

  if (!cart) return 0;

  return size(cart);
}

export function removeProductFromCartApi(item) {
  const cart = getProductsFromCartApi();

  remove(cart, (product) => {
    return product === item;
  });

  if (size(cart) > 0) {
    localStorage.setItem("cart", cart);
  } else {
    localStorage.removeItem("cart");
  }
}

export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const shippingAddress = address;
    delete shippingAddress.user;
    delete shippingAddress.createdAt;

    const url = `${server_address}:${server_port}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        shippingAddress,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
}

export function removeAllProductsFromCartApi() {
  localStorage.removeItem("cart");
}
