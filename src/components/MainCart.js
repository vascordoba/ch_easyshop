import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-bootstrap";
import MainCartProduct from "@components/MainCartProduct";
import Alert from "@components/Alert";

function MainCart(props) {
  const { products, brandFilter, onAddToCart, alerts } = props;
  console.log("CART PRODS", products);
  const [notification, setNots] = useState([]);

  useEffect(() => {
    let tempNots = [];
    for (const alert of alerts) {
      tempNots.push(<Alert alert={alert} />);
    }
    setNots(tempNots);
  }, [alerts]);

  return (
    <div className="App">
      <ToastContainer className="position-fixed top-0 start-50" style={{ zIndex: 2000 }}>
        {notification}
      </ToastContainer>
      <main className="main-cart">
        {brandFilter.length > 0
          ? products.map((prod) => {
              return brandFilter.find((bf) => bf === prod.brand) ? (
                <MainCartProduct key={prod.id} item={prod} onAddToCart={onAddToCart} />
              ) : (
                ""
              );
            })
          : products.map((prod) => <MainCartProduct key={prod.id} item={prod} onAddToCart={onAddToCart} />)}
      </main>
    </div>
  );
}

export default MainCart;
