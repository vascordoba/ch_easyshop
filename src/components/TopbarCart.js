import React from "react";
import { BsCart2 } from "react-icons/bs";

function TopbarCart(props) {
  return (
    <>
      <BsCart2 />
      <span> {props.cant ? props.cant : 0}</span>
    </>
  );
}

export default TopbarCart;
