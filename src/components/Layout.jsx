import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Topbar from "@components/Topbar";

export const siteTitle = "EasyCellShop";
export default function Layout(props) {
  return (
    <>
      <Container fluid>
        <Topbar />
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    </>
  );
}
