import React from "react";
import { Card, Button } from "react-bootstrap";

export default function MainCartProduct(props) {
  const { item, onAddToCart } = props;
  const imgUrl = window.location.origin + "/assets/imgs/";

  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={imgUrl + item.img}
        style={{ height: 150, width: 100, marginLeft: "auto", marginRight: "auto" }}
      />
      <Card.Body>
        <Card.Title>{item.brand}</Card.Title>
        <Card.Subtitle>{item.name}</Card.Subtitle>
        <Card.Text>$ {item.price}</Card.Text>
        <Button variant="primary" onClick={() => onAddToCart(item)}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}
