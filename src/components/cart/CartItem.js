import React from "react";

import { Card } from "react-bootstrap";

function CartItem(props) {
  const { prod } = props;

  return (
    <Card className="text-start" style={{ marginBottom: 20 }}>
      <Card.Header>
        {prod.brand} {prod.name}{" "}
      </Card.Header>
      <Card.Body>
        <Card.Title>Price: ${prod.price}</Card.Title>
        <Card.Text>Quantity: {prod.q} units</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Sub total: ${parseFloat(prod.price * prod.q).toFixed(2)}</Card.Footer>
    </Card>
  );
}

export default CartItem;
