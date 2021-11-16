import { createContext } from "react";

const CartContext = createContext({
  countProductsInCart: 0,
  addProductToCart: () => null,
  getProductsFromCart: () => null,
  removeProductFromCart: () => null,
  removeAllProductsFromCart: () => null,
});

export default CartContext;
