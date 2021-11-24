import React from "react";
import { Button } from "react-bootstrap";

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
      <CartConsumer>
        {({ cart, removeFromCart, emptyCart }) => {
          return (
            <>
              <h4>
                Items in cart{" "}
                {cart.length > 0 ? (
                  <Button size="sm" onClick={() => emptyCart()}>
                    Empty cart
                  </Button>
                ) : (
                  ""
                )}
              </h4>
              {cart.map((prod) => (
                <CartItem prod={prod} key={prod.id} onRemoveFromCart={removeFromCart} />
              ))}
              <h5 style={{ marginTop: 20 }}>Total to pay: ${getCartTotalAmount(cart)}</h5>
            </>
          );
        }}
      </CartConsumer>
    </main>
  );
}

export default Cart;
