import React from "react";
import { Card, Button, Placeholder } from "react-bootstrap";

export default function MainCartProduct(props) {
  const { item, onAddToCart } = props;
  const imgUrl = window.location.origin + "/assets/imgs/";

  if (item.brand) {
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
  } else {
    return (
      <Card style={{ width: "16rem" }}>
        <Card.Img
          variant="top"
          src={imgUrl + "placeholder.png"}
          style={{ height: 150, width: 100, marginLeft: "auto", marginRight: "auto" }}
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Subtitle} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder.Button variant="primary" animation="glow" xs={6} />
        </Card.Body>
      </Card>
    );
  }
}
