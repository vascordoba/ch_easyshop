import React, { useState, useEffect } from "react";
import { Card, Placeholder, Table, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { getProduct, getBrands } from "@utils/services";
import ProductCount from "@components/catalog/ProductCount";
import { Link, useLocation } from "react-router-dom";

const placeHolder = { id: 0 };
const placeHolderNotFound = {
  id: 0,
  name: "Product not found",
  brand: " ",
  price: 0,
  stock: 0,
  img: "placeholder.png",
  category: 1,
};

export default function ProductDetail(props) {
  const { prodId } = useParams();

  const imgUrl = window.location.origin + "/assets/imgs/";
  const [item, setItem] = useState(placeHolder);

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const q = useQuery();

  //load product by id
  useEffect(() => {
    const fetchProduct = async (id) => {
      const newProd = await getProduct(id);
      const brands = await getBrands();
      if (newProd) {
        const brand = brands.find((b) => b.id === newProd.brand);
        newProd.brandName = brand.name;
        setItem(newProd);
      } else setItem(placeHolderNotFound);
    };
    setItem(placeHolder);
    fetchProduct(prodId);
  }, []);

  const renderDet = (det) => {
    let detCol = [];
    Object.entries(item.details).forEach(([key, value]) => {
      detCol.push([key, value]);
    });
    return detCol.map((row, i) => (
      <tr key={i}>
        <td>{row[0]}</td>
        <td>{row[1]}</td>
      </tr>
    ));
  };

  if (item && item.brand) {
    return (
      <Card style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Card.Img
          variant="top"
          src={imgUrl + item.img}
          style={{ height: 300, width: 175, marginLeft: 100, marginTop: 50, marginBottom: 200 }}
        />
        <Card.Body style={{ marginTop: 50, marginLeft: 50, marginRight: 50, width: "80%" }}>
          <Card.Title>{item.brandName}</Card.Title>
          <Card.Subtitle>{item.name}</Card.Subtitle>
          <Card.Text>$ {item.price}</Card.Text>
          {item.details ? (
            <Table striped bordered hover size="sm" responsive style={{ width: "50%" }}>
              <thead>
                <tr>
                  <th colSpan="2">Specs</th>
                </tr>
              </thead>
              <tbody>{renderDet()}</tbody>
            </Table>
          ) : (
            ""
          )}
        </Card.Body>
        <Card.Footer className="text-muted" style={{ minWidth: "13%" }}>
          <Link to="/">
            <Button size="sm" variant="secondary">
              Back
            </Button>
          </Link>
          <ProductCount item={item} cantFromCart={q.get("q")} />
        </Card.Footer>
      </Card>
    );
  } else {
    return (
      <Card style={{ width: "100rem", display: "flex", flexDirection: "row" }}>
        <Card.Img
          variant="top"
          src={imgUrl + "placeholder.png"}
          style={{ height: 300, width: 175, marginLeft: 100, marginTop: 50, marginBottom: 200 }}
        />
        <Card.Body style={{ marginTop: 50, marginLeft: 50, marginRight: 50 }}>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Subtitle} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Table striped bordered hover size="sm" responsive style={{ width: "50%" }}>
            <thead>
              <tr>
                <th colSpan="2">
                  <Placeholder xs={12} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Placeholder xs={12} />
                </td>
              </tr>
              <tr>
                <td>
                  <Placeholder xs={12} />
                </td>
              </tr>
              <tr>
                <td>
                  <Placeholder xs={12} />
                </td>
              </tr>
              <tr>
                <td>
                  <Placeholder xs={12} />
                </td>
              </tr>
              <tr>
                <td>
                  <Placeholder xs={12} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
