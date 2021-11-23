import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import CatalogItem from "@components/catalog/CatalogItem";

import { getProducts } from "@utils/services";

const placeHolders = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

function Catalog(props) {
  const { brandFilter } = props;
  const [prods, setProds] = useState(placeHolders);

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

  return (
    <div className="App">
      <main className="main-cart">
        {prods.map((prod) => {
          //render placeholders
          if (typeof prod.brand === "undefined" || typeof prod.category === "undefined") {
            return <CatalogItem key={prod.id} item={prod} />;
          }
          //render products filtered by brand and categoty
          else if (
            brandFilter.length > 0 &&
            brandFilter.includes(prod.brand) &&
            (!categoryId || (categoryId && prod.category === parseInt(categoryId)))
          ) {
            return <CatalogItem key={prod.id} item={prod} />;
          }
          //render products filtered by categoty
          else if (
            brandFilter.length === 0 &&
            (!categoryId || (categoryId && prod.category === parseInt(categoryId)))
          ) {
            return <CatalogItem key={prod.id} item={prod} />;
          }
          return "";
        })}
      </main>
    </div>
  );
}

export default Catalog;
