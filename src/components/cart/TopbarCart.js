import React from "react";
import { Badge } from "react-bootstrap";
import { BsCart2 } from "react-icons/bs";
import { CartConsumer } from "@context/CartContext";

function TopbarCart(props) {
  return (
    <CartConsumer>
      {({ itemsCountProp }) => {
        return itemsCountProp > 0 ? (
          <>
            <BsCart2 />
            <Badge> {itemsCountProp}</Badge>
          </>
        ) : (
          ""
        );
      }}
    </CartConsumer>
  );
}

export default TopbarCart;
