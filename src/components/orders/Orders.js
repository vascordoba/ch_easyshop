import React, { useState, useContext } from "react";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DotLoaderOverlay } from "react-spinner-overlay";

import OrderDetail from "@components/orders/OrderDetail";
import CartContext from "@context/CartContext";

function Orders() {
  const { getUserOrders } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSearchOrders = async () => {
    if (email !== "") {
      setLoading(true);
      const ordersTmp = await getUserOrders(email);
      setOrders(ordersTmp)
      setLoading(false);
    } else {
      alert("You need to provide an email address")
    }
  }

  const handleCancelSearch = () => {
    setEmail("")
    setOrders(null)
  }

  return (<main className="cart container-fluid">
    <DotLoaderOverlay
      color="#32C7BB"
      loading={loading}
      message={<p style={{ marginTop: "12px" }}>We are searching your orders, please wait...</p>}
    />
    <Container fluid>
      {orders === null ?
        (<Row>
          <Col sm="6">
            <h6>Customer info</h6>
            <Form>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email to search for orders"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </Form.Group>
              <Link to="/">
                <Button size="sm" variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button size="sm" className="ms-2" onClick={handleSearchOrders}>
                Search orders
              </Button>
            </Form>
          </Col>
        </Row>) : (<Row>
          {orders.length > 0 ?
            (<Col><h4>Order of {email} <Button size="sm" variant="secondary" className="ms-1" onClick={handleCancelSearch}>
              Back to Orders search
            </Button></h4>
              {orders.map(order => <OrderDetail order={order} />)}
            </Col>) :
            <Col>
              <h6>We have not found orders associated to your email account</h6>
              <Link to="/">
                <Button size="sm" variant="secondary">
                  Back to Products catalog
                </Button>
              </Link>
              <Button size="sm" variant="secondary" className="ms-1" onClick={handleCancelSearch}>
                Back to Orders search
              </Button>
            </Col>}

        </Row>)}
    </Container>

  </main>)
}

export default Orders