import "./App.css";
import "@assets/css/styles.css";
import React, { useState } from "react";
import { Col, Container, Row, Toast } from "react-bootstrap";
import Topbar from "@components/Topbar";
import MainCart from "@components/MainCart";

import brands from "@assets/files/brands.json";
import products from "@assets/files/products.json";

function App() {
  const [brandFilter, setBrandFilter] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [alerts, setAlerts] = useState([]);
  const [alertId, setAlertId] = useState(1);

  const handleFilterBrand = (e) => {
    //clear all brand filters
    if (e === "CLEAR") {
      setBrandFilter([]);
    } else {
      //obtain the brand clicked
      const filter = e.target.id.split("-");
      if (typeof filter[1] !== "undefined")
        if (brandFilter.find((bf) => bf === filter[1])) {
          //if brand already in filters, remove it
          const filtered = brandFilter.filter((bf) => bf !== filter[1]);
          setBrandFilter(filtered);
        }
        //otherwise, add it to filters
        else {
          setBrandFilter([...brandFilter, filter[1]]);
        }
    }
  };

  const handleAddToCart = (prod) => {
    const prodInCart = productCart.find((p) => p.id === prod.id);
    //if prod in cart, add 1 to the quantity
    if (prodInCart) {
      // add 1 more if the stock of the product is ok
      if (prodInCart.q + 1 <= prod.stock) {
        prodInCart.q++;
        const filteredCart = productCart.filter((p) => p.id !== prod.id);
        setProductCart([...filteredCart, prodInCart]);
        setAlerts([
          ...alerts,
          {
            id: alertId,
            type: "success",
            title: "Added to cart",
            body: "You just added another " + prod.name + " to your cart",
          },
        ]);
        setAlertId(alertId + 1);
      } else {
        setAlerts([
          ...alerts,
          {
            id: alertId,
            type: "danger",
            title: "Can't add to cart",
            body: prod.name + " is out of stock",
          },
        ]);
        setAlertId(alertId + 1);
      }
    }
    //add the product for the first time to the cart
    else {
      const newProd = {
        id: prod.id,
        name: prod.name,
        brand: prod.brand,
        price: prod.price,
        q: 1,
      };
      setProductCart([...productCart, newProd]);
      setAlerts([
        ...alerts,
        {
          id: alertId,
          type: "success",
          title: "Added to cart",
          body: "You just added a new " + prod.name + " to your cart",
        },
      ]);
      setAlertId(alertId + 1);
    }
    let tempTotal = 0.0;
    for (const prodInCart of productCart) {
      tempTotal += parseFloat(prodInCart.price) * parseInt(prodInCart.q);
    }
    setCartTotal(tempTotal);
    console.log("TOTAL", tempTotal);
  };

  return (
    <Container fluid className="main-app">
      <Topbar onFilterBrand={handleFilterBrand} brands={brands} brandFilter={brandFilter} cart={productCart} />
      <Row>
        <Col>
          <MainCart products={products} brandFilter={brandFilter} onAddToCart={handleAddToCart} alerts={alerts} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
