import React from "react";
import { BsCart2 } from "react-icons/bs";

function TopbarCart(props) {
  const { cart } = props;

  const countCartProds = (cart) => {
    let total = 0;
    for (const prod of cart) {
      console.log(prod);
      total += prod.q;
    }
    return total;
  };

  return (
    <>
      <BsCart2 />
      <span> {countCartProds(cart)}</span>
    </>
  );
}

export default TopbarCart;
