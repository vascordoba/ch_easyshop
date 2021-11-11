import React from "react";
import { Card, Placeholder } from "react-bootstrap";

export default function ProductDetail(props) {
  const { item } = props;
  const imgUrl = window.location.origin + "/assets/imgs/";

  if (item && item.brand) {
    return (
      <Card style={{ width: "30rem" }}>
        <Card.Img
          variant="top"
          src={imgUrl + item.img}
          style={{ height: 150, width: 100, marginLeft: "auto", marginRight: "auto" }}
        />
        <Card.Body>
          <Card.Title>{item.brand}</Card.Title>
          <Card.Subtitle>{item.name}</Card.Subtitle>
          <Card.Text>$ {item.price}</Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card style={{ width: "30rem" }}>
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
        </Card.Body>
      </Card>
    );
  }
}
