import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer } from "react-bootstrap";
import CatalogItem from "@components/catalog/CatalogItem";
import Alert from "@components/notifications/Alert";
import { getProducts } from "@utils/services";

const placeHolders = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

function Catalog(props) {
  const { brandFilter, onAddToCart, alerts, onCatalogUnmount } = props;
  const [prods, setProds] = useState(placeHolders);
  const [notification, setNots] = useState([]);
  const { categoryId } = useParams();

  //load products
  useEffect(() => {
    const fetchProducts = async () => {
      let to = setTimeout(async () => {
        const newProds = await getProducts();
        setProds(newProds);
        clearTimeout(to);
      }, 1500);
    };
    setProds(placeHolders);
    fetchProducts();
  }, [categoryId, brandFilter]);

  //show alerts
  useEffect(() => {
    let tempNots = [];
    for (const alert of alerts) {
      tempNots.push(<Alert alert={alert} key={alert.id} />);
    }
    setNots(tempNots);
  }, [alerts]);

  //clean alerts array
  useEffect(() => {
    return () => {
      onCatalogUnmount([]);
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer className="position-fixed top-0 start-50" style={{ zIndex: 2000 }}>
        {notification}
      </ToastContainer>
      <main className="main-cart">
        {prods.map((prod) => {
          //render placeholders
          if (typeof prod.brand === "undefined" || typeof prod.category === "undefined") {
            return <CatalogItem key={prod.id} item={prod} onAddToCart={onAddToCart} />;
          }
          //render products filtered by brand and categoty
          else if (
            brandFilter.length > 0 &&
            brandFilter.includes(prod.brand) &&
            (!categoryId || (categoryId && prod.category === parseInt(categoryId)))
          ) {
            return <CatalogItem key={prod.id} item={prod} onAddToCart={onAddToCart} />;
          }
          //render products filtered by categoty
          else if (
            brandFilter.length === 0 &&
            (!categoryId || (categoryId && prod.category === parseInt(categoryId)))
          ) {
            return <CatalogItem key={prod.id} item={prod} onAddToCart={onAddToCart} />;
          }
          return "";
        })}
      </main>
    </div>
  );
}

export default Catalog;
