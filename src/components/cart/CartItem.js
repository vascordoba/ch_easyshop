import React from "react";
import { Link } from "react-router-dom";

import { Card, Button } from "react-bootstrap";

function CartItem(props) {
  const { prod, onRemoveFromCart } = props;

  return (
    <Card className="text-start" style={{ marginBottom: 20 }}>
      <Card.Header>
        <Link to={"/detail/" + prod.id + "?q=" + prod.q}>
          {prod.brand} {prod.name}
        </Link>
      </Card.Header>
      <Card.Body>
        <Card.Title>Price: ${prod.price}</Card.Title>
        <Card.Text>Quantity: {prod.q} units</Card.Text>
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
