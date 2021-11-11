import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-bootstrap";
import MainCartProduct from "@components/MainCartProduct";
import Alert from "@components/Alert";
import CartModal from "@components/CartModal";

function MainCart(props) {
  const { products, brandFilter, onAddToCart, alerts } = props;
  const [notification, setNots] = useState([]);
  const [prodDetail, setProdDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [prodToShow, setProdToShow] = useState({});

  const handleClose = () => {
    setShowDetail(false);
    setProdDetail({});
  };

  const handleOpenDetails = (prod) => {
    setProdDetail(prod);
    setShowDetail(true);
  };

  useEffect(() => {
    const loadProduct = (timeout, prod) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(prod), timeout);
      });
    };
    if (prodDetail === {}) {
      loadProduct(0, prodDetail).then((r) => setProdToShow(r));
    } else {
      loadProduct(0, prodToShow)
        .then((r) => setProdToShow(r))
        .then(() => loadProduct(2000, prodDetail))
        .then((r) => setProdToShow(r));
    }
  }, [prodToShow, prodDetail]);

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
                <MainCartProduct
                  key={prod.id}
                  item={prod}
                  onAddToCart={onAddToCart}
                  onShowDetails={handleOpenDetails}
                />
              ) : (
                ""
              );
            })
          : products.map((prod) => (
              <MainCartProduct key={prod.id} item={prod} onAddToCart={onAddToCart} onShowDetails={handleOpenDetails} />
            ))}
      </main>
      <CartModal showDetail={showDetail} product={prodToShow} onClose={handleClose} />
    </div>
  );
}

export default MainCart;
