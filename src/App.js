import "./App.css";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { getBrands, getCategories } from "./utils/services";

import Topbar from "@components/layout/Topbar";
import Catalog from "@components/catalog/Catalog";
import Cart from "@components/cart/Cart";
import ProductDetail from "@components/catalog/ProductDetail";

function App() {
  const [brandFilter, setBrandFilter] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [alertId, setAlertId] = useState(1);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

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
  };

  //load brands globally
  useEffect(() => {
    const fetchBrands = async () => {
      const newBrands = await getBrands();
      setBrands(newBrands);
    };
    fetchBrands();
  }, []);

  //load categories globally
  useEffect(() => {
    const fetchCategories = async () => {
      const newCats = await getCategories();
      setCategories(newCats);
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <Container fluid className="main-app">
        <Topbar
          onFilterBrand={handleFilterBrand}
          brands={brands}
          brandFilter={brandFilter}
          cart={productCart}
          categories={categories}
        />
        <Row>
          <Col>
            <Routes>
              <Route
                path="/"
                element={
                  <Catalog
                    brandFilter={brandFilter}
                    onAddToCart={handleAddToCart}
                    alerts={alerts}
                    onCatalogUnmount={setAlerts}
                  />
                }
              />
              <Route
                path={"/category/:categoryId"}
                element={
                  <Catalog
                    brandFilter={brandFilter}
                    onAddToCart={handleAddToCart}
                    alerts={alerts}
                    onCatalogUnmount={setAlerts}
                  />
                }
              />
              <Route path="/detail/:prodId" element={<ProductDetail onAddToCart={handleAddToCart} />} />
              <Route path="/cart" element={<Cart productsAdded={productCart} />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
