import React from "react";
import { Badge } from "react-bootstrap";
import { BsCart2 } from "react-icons/bs";
import { CartConsumer } from "@context/CartContext";

function TopbarCart(props) {
  return (
    <CartConsumer>
      {({ getItemsCount }) => (
        <>
          <BsCart2 />
          {getItemsCount() > 0 ? <Badge>{getItemsCount()}</Badge> : ""}
        </>
      )}
    </CartConsumer>
  );
}

export default TopbarCart;
