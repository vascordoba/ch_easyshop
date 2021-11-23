import React from "react";

import CartItem from "@components/cart/CartItem";
import { CartConsumer } from "@context/CartContext";

function Cart() {
  const getCartTotalAmount = (prods) => {
    let total = 0.0;
    prods.map((prod) => (total += parseFloat(prod.q * prod.price)));
    return total.toFixed(2);
  };

  return (
    <main className="cart">
      <h4>Items in cart</h4>
      <CartConsumer>
        {({ cart }) => {
          return (
            <>
              {cart.map((prod) => (
                <CartItem prod={prod} key={prod.id} />
              ))}
              <h5 style={{ marginTop: 20 }}>Total to pay: ${getCartTotalAmount(cart)}</h5>;
            </>
          );
        }}
      </CartConsumer>
    </main>
  );
}

export default Cart;
