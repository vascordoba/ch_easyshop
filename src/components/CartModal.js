import React from "react";
import { Button, Modal } from "react-bootstrap";
import ProductDetail from "@components/ProductDetail";

export default function CartModal(props) {
  const { product, onClose, showDetail } = props;

  return (
    <Modal show={showDetail} onHide={onClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Product detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductDetail item={product} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
