import React, { createContext, useState, useContext } from "react";

import AlertContext from "@context/AlertContext";
import { getUser, createUser, createOrder } from "../utils/services";
const CartContext = createContext([]);

export const CartProvider = ({ defaultValue, children }) => {
  const { addAlert } = useContext(AlertContext);
  const [cart, setCart] = useState(defaultValue || []);
  const [itemsC, setItemsC] = useState(0);

  const getProduct = (id) => {
    if (cart && cart.length) {
      const found = cart.find((o) => o.id === id);
      return found ? found : null;
    }
    return null;
  };

  const getQProduct = (id) => {
    if (cart && cart.length) {
      const found = cart.find((o) => o.id === id);
      return found ? found.q : 0;
    }
    return 0;
  };

  const itemsCount = () => {
    const total = getItemsCount();
    setItemsC(total);
    return total;
  };

  const getItemsCount = () => {
    let total = 0;
    for (const prod of cart) {
      total += parseInt(prod.q);
    }
    return total;
  };

  const totalCart = () => {
    let total = 0.0;
    for (const prod of cart) {
      total += parseFloat(prod.q * prod.price);
    }
    return total;
  };

  const isInCart = (id) => {
    return id === undefined ? false : getProduct(id) !== null;
  };

  const addOneToCart = (id) => {
    const inCart = isInCart(id);
    if (inCart) {
      const objInCart = getProduct(id);
      if (objInCart.q + 1 <= objInCart.stock) {
        objInCart.q++;
        const filteredCart = cart.filter((p) => p.id !== id);
        setCart([...filteredCart, objInCart]);
        itemsCount();
      }
    }
  };

  const removeOneFromCart = (id) => {
    const inCart = isInCart(id);
    if (inCart) {
      const objInCart = getProduct(id);
      objInCart.q--;
      const filteredCart = cart.filter((p) => p.id !== id);
      if (objInCart.q === 0) {
        setCart([...filteredCart]);
      } else {
        setCart([...filteredCart, objInCart]);
      }
      itemsCount();
    }
  };

  const addToCart = (o, q, replace = false) => {
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
            itemsCount();
          } else if (objInCart.q + q <= o.stock) {
            objInCart.q += q;
            const filteredCart = cart.filter((p) => p.id !== o.id);
            setCart([...filteredCart, objInCart]);
            itemsCount();
          } else {
            result = { title: "Can't add to cart", type: "warning", body: o.name + " stock is not enough" };
          }
        }
      } else {
        const newProd = {
          id: o.id,
          name: o.name,
          brand: o.brand,
          brandName: o.brandName,
          stock: o.stock,
          price: o.price,
          img: o.img,
          q: q,
        };
        setCart([...cart, newProd]);
        itemsCount();
      }
    } else {
      result = { title: "Not found", type: "danger", body: "The product requested does not exists" };
    }
    addAlert(result);
    return result;
  };

  const removeFromCart = (id) => {
    if (cart && cart.length) {
      let newCart = cart.filter((o) => o.id !== id);
      if (newCart === undefined) newCart = [];
      setCart(newCart);
      itemsCount();
      return true;
    }
    return false;
  };

  const emptyCart = () => {
    setCart([]);
    setItemsC(0);
  };

  const placeOrder = async (user) => {
    let userRegistered = null;
    const userExists = await getUser(user.email);

    if (userExists.length === 0) {
      userRegistered = await createUser(user);
    } else {
      userRegistered = userExists[0];
    }
    const order = {
      date: new Date().toISOString().slice(0, 10),
      buyer: userRegistered.id,
      items: cart,
      total: totalCart(),
    };
    const orderId = await createOrder(order);
    return orderId.id;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        isInCart,
        getQProduct,
        itemsCount,
        removeFromCart,
        emptyCart,
        addOneToCart,
        removeOneFromCart,
        totalCart,
        getItemsCount,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartConsumer = CartContext.Consumer;

export default CartContext;
