import React from "react";
import { Card, Table } from "react-bootstrap";

function OrderDetail({ order }) {

  const orderTotal = (order) => {
    let total = 0.0;
    order.items.map(item => total += parseFloat(item.q * item.price))
    return total;
  }

  return (<Card className="text-start" style={{ marginBottom: 20 }}>
    <Card.Header>Order ID {order.id}</Card.Header>
    <Card.Body>

      <h6>Purchase date: {order.date}</h6>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((prod, i) => (
            <tr id={i}>
              <td>{prod.q}</td>
              <td>
                {prod.brandName} {prod.name}
              </td>
              <td>${prod.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
    <Card.Footer>
      <div className="text-end">
        Order total: ${orderTotal(order)}
      </div>
    </Card.Footer>
  </Card>

  );
}

export default OrderDetail;
