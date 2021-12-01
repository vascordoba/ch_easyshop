import React from "react";
import { Badge } from "react-bootstrap";
import { BsCart2 } from "react-icons/bs";
import { CartConsumer } from "@context/CartContext";

function TopbarCart(props) {
  return (
    <CartConsumer>
      {({ getItemsCount }) => {
        console.log("TOPCART ITEMS COUNT", getItemsCount());
        return getItemsCount() > 0 ? (
          <>
            <BsCart2 />
            <Badge> {getItemsCount()}</Badge>
          </>
        ) : (
          ""
        );
      }}
    </CartConsumer>
  );
}

export default TopbarCart;
