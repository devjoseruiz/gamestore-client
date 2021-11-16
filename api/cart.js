import getConfig from "next/config";
import { authFecth } from "./token";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export function getProductsFromCartApi() {
  const cart = localStorage("cart");

  if (!cart) return null;

  const products = cart.split(",");
  return products;
}
