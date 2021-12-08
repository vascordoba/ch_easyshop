import React, { useState, useContext } from "react";
import { Card, Button, Row, Col, Form, Container, Table } from "react-bootstrap";
import { DotLoaderOverlay } from "react-spinner-overlay";

import CartContext, { CartConsumer } from "@context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function CartCheckout() {
  const { placeOrder, getItemsCount, emptyCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePhone = (evt) => {
    setPhone(evt.target.value);
  };

  const handlePlaceOrder = async () => {
    if (getItemsCount() > 0 && name !== "" && email !== "" && phone !== "") {
      setLoading(true);
      const orderId = await placeOrder({ name, email, phone });
      alert("Your order " + orderId + " has been confirmed");
      setLoading(false);
      setName("");
      setEmail("");
      setPhone("");
      emptyCart();
      navigate("/");
    } else {
      alert("Please, verify user and cart data");
    }
  };

  return (
    <CartConsumer>
      {({ cart, totalCart }) => (
        <>
          <DotLoaderOverlay
            color="#32C7BB"
            loading={loading}
            message={<p style={{ marginTop: "12px" }}>Your order is being processed, please wait...</p>}
          />
          <Card className="text-start" style={{ marginBottom: 20 }}>
            <Card.Header>Checkout</Card.Header>
            <Card.Body style={{ display: "flex", justifyContent: "space-around" }}>
              <Container fluid>
                <Row>
                  <Col sm="6">
                    <h6>Customer info</h6>
                    <Form>
                      <Form.Group className="mb-3" controlId="userName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleChangeName} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={handleChangeEmail}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="userPhone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="ie: +44 112 4321236"
                          value={phone}
                          onChange={handleChangePhone}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col sm="6">
                    <h6>Order summary</h6>
                    <Table striped hover size="sm">
                      <thead>
                        <tr>
                          <th>Quantity</th>
                          <th>Product</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((prod, i) => (
                          <tr id={i}>
                            <td>{prod.q}</td>
                            <td>
                              {prod.brandName} {prod.name}
                            </td>
                            <td>${prod.price}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="3">&nbsp;</td>
                        </tr>
                        <tr>
                          <td colSpan="2">&nbsp;</td>
                          <td>${totalCart()}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            <Card.Footer>
              <div className="text-end">
                <Link to="/cart">
                  <Button size="sm" variant="secondary">
                    Cancel
                  </Button>
                </Link>
                <Button size="sm" className="ms-2" onClick={handlePlaceOrder}>
                  Place order
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </>
      )}
    </CartConsumer>
  );
}

export default CartCheckout;
