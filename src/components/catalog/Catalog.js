import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import CatalogItem from "@components/catalog/CatalogItem";

import { getProducts } from "@utils/services";

const placeHolders = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

function Catalog(props) {
  const { brandFilter, brands } = props;
  const [prods, setProds] = useState(placeHolders);

  const { categoryId } = useParams();

  //load products
  useEffect(() => {
    const fetchProducts = async () => {
      const newProds = await getProducts();
      setProds(newProds);
    };
    setProds(placeHolders);
    fetchProducts();
  }, [categoryId, brandFilter]);

  //get brand name
  const getBrandName = (id) => {
    const brand = brands.find((b) => b.id === id);
    if (!brand) return "";
    return brand.name;
  };

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
            prod.brandName = getBrandName(prod.brand);
            return <CatalogItem key={prod.id} item={prod} />;
          }
          //render products filtered by categoty
          else if (
            brandFilter.length === 0 &&
            (!categoryId || (categoryId && prod.category === parseInt(categoryId)))
          ) {
            prod.brandName = getBrandName(prod.brand);
            return <CatalogItem key={prod.id} item={prod} />;
          }
          return "";
        })}
      </main>
    </div>
  );
}

export default Catalog;
