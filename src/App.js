import "./App.css";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { getBrands, getCategories } from "./utils/services";

import { CartProvider } from "@context/CartContext";
import { AlertProvider } from "@context/AlertContext";
import Topbar from "@components/layout/Topbar";
import Catalog from "@components/catalog/Catalog";
import Cart from "@components/cart/Cart";
import ProductDetail from "@components/catalog/ProductDetail";
import CartCheckout from "@components/cart/CartCheckout";
import Orders from "@components/orders/Orders";

function App() {
  const [brandFilter, setBrandFilter] = useState([]);
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

  if (!brands && !categories) {
    return <>Loading...</>;
  }

  return (
    <BrowserRouter>
      <Container fluid className="main-app">
        <AlertProvider>
          <CartProvider>
            <Topbar
              onFilterBrand={handleFilterBrand}
              brands={brands}
              brandFilter={brandFilter}
              categories={categories}
            />
            <Row>
              <Col>
                <Routes>
                  <Route path="/" element={<Catalog brandFilter={brandFilter} brands={brands} />} />
                  <Route
                    path={"/category/:categoryId"}
                    element={<Catalog brandFilter={brandFilter} brands={brands} />}
                  />
                  <Route path="/detail/:prodId" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<CartCheckout />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </Col>
            </Row>
          </CartProvider>
        </AlertProvider>
      </Container>
    </BrowserRouter>
  );
}

export default App;
