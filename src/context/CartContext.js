import React, { createContext, useState, useContext } from "react";

import AlertContext from "@context/AlertContext";
const CartContext = createContext([]);

export const CartProvider = ({ defaultValue, children }) => {
  const { addAlert } = useContext(AlertContext);
  const [cart, setCart] = useState(defaultValue || []);
  const [itemsC, setItemsC] = useState(0);

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
    setItemsC(total);
    return total;
  }

  function totalCart() {
    let total = 0.0;
    for (const prod of cart) {
      total += parseFloat(prod.q * prod.price);
    }
    return total;
  }

  function isInCart(id) {
    return id === undefined ? false : getProduct(id) !== null;
  }

  function addOneToCart(id) {
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
  }

  function removeOneFromCart(id) {
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
  }

  function removeFromCart(id) {
    if (cart && cart.length) {
      let newCart = cart.filter((o) => o.id !== id);
      if (newCart === undefined) newCart = [];
      setCart(newCart);
      itemsCount();
      return true;
    }
    return false;
  }

  function emptyCart() {
    setCart([]);
    itemsCount();
  }

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
        itemsCountProp: itemsC,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartConsumer = CartContext.Consumer;

export default CartContext;
