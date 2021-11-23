import React from "react";
import { Badge } from "react-bootstrap";
import { BsCart2 } from "react-icons/bs";
import { CartConsumer } from "@context/CartContext";

function TopbarCart(props) {
  return (
    <CartConsumer>
      {({ itemsCount }) => (
        <>
          <BsCart2 />
          {itemsCount() > 0 ? <Badge> {itemsCount()}</Badge> : ""}
        </>
      )}
    </CartConsumer>
  );
}

export default TopbarCart;
