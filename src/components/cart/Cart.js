import React, { useState, useEffect } from "react";

import CartItem from "@components/cart/CartItem";

function Cart(props) {
  const { productsAdded } = props;

  const getCartTotalAmount = (prods) => {
    let total = 0.0;
    prods.map((prod) => (total += parseFloat(prod.q * prod.price)));
    return total.toFixed(2);
  };

  return (
    <main className="cart">
      <h4>Items in cart</h4>
      {productsAdded.map((prod) => (
        <CartItem prod={prod} key={prod.id} />
      ))}
      <h5 style={{ marginTop: 20 }}>Total to pay: ${getCartTotalAmount(productsAdded)}</h5>
    </main>
  );
}

export default Cart;
