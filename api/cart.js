import getConfig from "next/config";
import { authFecth } from "./token";
import { size, includes, remove } from "lodash";
import { toast } from "react-toastify";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export function getProductsFromCartApi() {
  const cart = localStorage.getItem("cart");

  if (!cart) return null;

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
