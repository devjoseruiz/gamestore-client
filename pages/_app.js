import React, { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token";
import {
  getProductsFromCartApi,
  addProductToCartApi,
  countProductsInCartApi,
} from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [reloadCart, setReloadCart] = useState(false);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  useEffect(() => {
    setTotalProductsInCart(countProductsInCartApi());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const checkBeforeAddProduct = (auth, product) => {
    if (auth) {
      addProductToCartApi(product);
      setReloadCart(true);
    } else {
      toast.error("You must be logged in!", {
        theme: "colored",
      });
    }
  };

  const cartData = useMemo(
    () => ({
      countProductsInCart: totalProductsInCart,
      addProductToCart: (product) => checkBeforeAddProduct(auth, product),
      getProductsFromCart: () => getProductsFromCartApi(),
      removeProductFromCart: (product) => console.log(product),
      removeAllProductsFromCart: () => null,
    }),
    [totalProductsInCart]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
