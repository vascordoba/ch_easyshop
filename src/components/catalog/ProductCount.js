import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCount(props) {
  const { item, cantFromCart } = props;
  const [count, setCount] = useState(cantFromCart ? parseInt(cantFromCart) : 0);
  const [finalCount, setFinalCount] = useState(0);
  const [addVisible, setAddVisible] = useState(parseInt(cantFromCart) > 0);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleOnQuantityChange = (q) => {
    if (q >= 0 && q <= item.stock) {
      setCount(q);
      setAddVisible(q > 0);
    }
  };

  const handleAddToCart = () => {
    setFinalCount(count);
    setShowCheckout(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {showCheckout ? (
        <Link to="/cart">
          <Button size="sm" variant="success" style={{ marginTop: 10 }}>
            Checkout
          </Button>
        </Link>
      ) : (
        <>
          <Form style={{ display: "flex", marginTop: 30, justifyContent: "space-between" }}>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                handleOnQuantityChange(count - 1);
              }}
            >
              -
            </Button>
            <Form.Control size="sm" type="text" value={count} readOnly style={{ maxWidth: 60 }} />
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                handleOnQuantityChange(count + 1);
              }}
            >
              +
            </Button>
          </Form>
          <Button
            size="sm"
            variant="primary"
            style={{ display: addVisible ? "block" : "none", marginTop: 10 }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </>
      )}
    </div>
  );
}
