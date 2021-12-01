import React from "react";
import { Badge } from "react-bootstrap";
import { BsCart2 } from "react-icons/bs";
import { CartConsumer } from "@context/CartContext";

function TopbarCart(props) {
  return (
    <CartConsumer>
      {({ itemsCount }) => {
        return itemsCount() > 0 ? (
          <>
            <BsCart2 />
            <Badge> {itemsCount()}</Badge>
          </>
        ) : (
          ""
        );
      }}
    </CartConsumer>
  );
}

export default TopbarCart;
