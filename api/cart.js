import { size, includes, remove } from "lodash";
import { toast } from "react-toastify";

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
