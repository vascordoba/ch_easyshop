import React from "react";
import { Card, Button } from "react-bootstrap";

import { CartConsumer } from "@context/CartContext";

function CartSummary() {
  return (
    <CartConsumer>
      {({ getItemsCount, totalCart }) => (
        <Card className="text-start" style={{ marginBottom: 20 }}>
          <Card.Header>Cart Summary</Card.Header>
          <Card.Body style={{ display: "flex", justifyContent: "space-around" }}>
            Items count: {getItemsCount()} unit{getItemsCount() > 1 ? "s" : ""}
          </Card.Body>
          <Card.Footer className="text-muted">
            Total: ${totalCart()}{" "}
            <Button size="sm" onClick={() => alert("Items Purchased!")}>
              Checkout
            </Button>
          </Card.Footer>
        </Card>
      )}
    </CartConsumer>
  );
}

export default CartSummary;
