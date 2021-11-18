import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Form, ToastContainer } from "react-bootstrap";
import "@assets/css/main.css";
import iconLogo from "@assets/img/icon-logo.png";
import TopbarCart from "@components/cart/TopbarCart";
import Alert from "@components/notifications/Alert";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Topbar(props) {
  const { onFilterBrand, brands, brandFilter, cart, categories, alerts, onCatalogUnmount } = props;

  const [notification, setNots] = useState([]);

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
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={iconLogo} alt="EasyCellShop" width="40" /> EasyCellShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {categories.map((cat) => (
              <Nav.Link as={Link} to={"/category/" + cat.id} key={cat.id}>
                {cat.name}
              </Nav.Link>
            ))}
            <Nav.Link as={Link} to="/cart">
              <TopbarCart cart={cart} />
            </Nav.Link>
            <Form>
              <NavDropdown title="Brands" id="collasible-nav-dropdown">
                {brands.map((brand, idx) => (
                  <NavDropdown.Item
                    key={brand}
                    id={`brand-${brand}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.target.checked = !e.target.checked;
                      onFilterBrand(e);
                    }}
                  >
                    {brand} {brandFilter.find((bf) => bf === brand) ? <BsCheck id={`brand-${brand}`} /> : ""}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Item
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onFilterBrand("CLEAR");
                  }}
                >
                  Clear
                </NavDropdown.Item>
              </NavDropdown>
            </Form>
            <NavDropdown title="My profile" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#config" onClick={() => alert("work in progress")}>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={() => alert("work in progress")}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer className="position-fixed top-0 start-50" style={{ zIndex: 2000 }}>
        {notification}
      </ToastContainer>
    </Navbar>
  );
}
