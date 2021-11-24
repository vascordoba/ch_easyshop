import React, { createContext, useState, useContext } from "react";

import AlertContext from "@context/AlertContext";
const CartContext = createContext([]);

export const CartProvider = ({ defaultValue, children }) => {
  const { addAlert } = useContext(AlertContext);
  const [cart, setCart] = useState(defaultValue || []);

  function getProduct(id) {
    if (cart && cart.length) {
      const found = cart.find((o) => o.id === id);
      return found ? found : null;
    }
    return null;
  }

  function getQProduct(id) {
    if (cart && cart.length) {
      const found = cart.find((o) => o.id === id);
      return found ? found.q : 0;
    }
    return 0;
  }

  function itemsCount() {
    let total = 0;
    for (const prod of cart) {
      total += parseInt(prod.q);
    }
    return total;
  }

  function isInCart(id) {
    return id === undefined ? false : getProduct(id) !== null;
  }

  function addToCart(o, q, replace = false) {
    let result = {
      title: "Added to cart",
      type: "success",
      body: "You just added " + q + " unit" + (q > 1 ? "s" : "") + " of " + o.name + " to your cart",
    };
    if (o && o.id) {
      const inCart = isInCart(o.id);
      if (inCart) {
        const objInCart = getProduct(o.id);
        if (objInCart) {
          if (replace) {
            objInCart.q = q;
            const filteredCart = cart.filter((p) => p.id !== o.id);
            setCart([...filteredCart, objInCart]);
          } else if (objInCart.q + q <= o.stock) {
            objInCart.q += q;
            const filteredCart = cart.filter((p) => p.id !== o.id);
            setCart([...filteredCart, objInCart]);
          } else {
            result = { title: "Can't add to cart", type: "warning", body: o.name + " stock is not enough" };
          }
        }
      } else {
        const newProd = {
          id: o.id,
          name: o.name,
          brand: o.brand,
          price: o.price,
          q: q,
        };
        setCart([...cart, newProd]);
      }
    } else {
      result = { title: "Not found", type: "danger", body: "The product requested does not exists" };
    }
    addAlert(result);
    return result;
  }

  function removeFromCart(id) {
    if (cart && cart.length) {
      let newCart = cart.filter((o) => o.id !== id);
      if (newCart === undefined) newCart = [];
      setCart(newCart);
      return true;
    }
    return false;
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, isInCart, getQProduct, itemsCount, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const CartConsumer = CartContext.Consumer;

export default CartContext;
