import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CartItem from "@components/cart/CartItem";
import CartSummary from "./CartSummary";
import { CartConsumer } from "@context/CartContext";

function Cart() {
  const getCartTotalAmount = (prods) => {
    let total = 0.0;
    prods.map((prod) => (total += parseFloat(prod.q * prod.price)));
    return total.toFixed(2);
  };

  return (
    <main className="cart container-fluid">
      <CartConsumer>
        {({ cart, removeFromCart, emptyCart, addOneToCart, removeOneFromCart }) => {
          return (
            <>
              {cart.length > 0 ? (
                <h4>
                  Items in cart{" "}
                  <Button size="sm" onClick={() => emptyCart()}>
                    Empty cart
                  </Button>
                </h4>
              ) : (
                <h4>
                  The cart is empty{" "}
                  <Link to="/">
                    <Button size="sm">Back to Shop</Button>
                  </Link>
                </h4>
              )}
              {cart.length > 0 ? (
                <div className="row">
                  <div className="col col-8">
                    {cart.map((prod) => (
                      <CartItem
                        prod={prod}
                        key={prod.id}
                        onRemoveFromCart={removeFromCart}
                        addOne={addOneToCart}
                        removeOne={removeOneFromCart}
                      />
                    ))}
                  </div>
                  <div className="col col-4">
                    <CartSummary />
                  </div>
                </div>
              ) : (
                ""
              )}

              {cart.length > 0 ? <h5 style={{ marginTop: 20 }}>Total to pay: ${getCartTotalAmount(cart)}</h5> : ""}
            </>
          );
        }}
      </CartConsumer>
    </main>
  );
}

export default Cart;
