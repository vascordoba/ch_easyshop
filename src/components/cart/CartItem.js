import React from "react";
import { Link } from "react-router-dom";

import { Card, Button } from "react-bootstrap";

function CartItem(props) {
  const { prod, onRemoveFromCart, addOne, removeOne } = props;
  const imgUrl = window.location.origin + "/assets/imgs/";

  return (
    <Card className="text-start" style={{ marginBottom: 20 }}>
      <Card.Header>
        <Link to={"/detail/" + prod.id + "?q=" + prod.q}>
          {prod.brand} {prod.name}
        </Link>
      </Card.Header>
      <Card.Body style={{ display: "flex", justifyContent: "space-around" }}>
        <img
          src={imgUrl + prod.img}
          alt={prod.name}
          style={{ height: 150, width: 100, marginTop: 5, marginBottom: 5 }}
        />
        <Card.Title>Price: ${prod.price}</Card.Title>
        <Card.Text>
          Quantity{" "}
          <Button size="sm" style={{ paddingTop: 0, paddingBottom: 0 }} onClick={() => addOne(prod.id)}>
            +
          </Button>{" "}
          {prod.q}{" "}
          <Button size="sm" style={{ paddingTop: 0, paddingBottom: 0 }} onClick={() => removeOne(prod.id)}>
            -
          </Button>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        Sub total: ${parseFloat(prod.price * prod.q).toFixed(2)}&nbsp;
        <Button size="sm" onClick={() => onRemoveFromCart(prod.id)}>
          Remove from cart
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default CartItem;
