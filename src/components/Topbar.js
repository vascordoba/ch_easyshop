import React from "react";
import { Nav, Navbar, Container, NavDropdown, Form } from "react-bootstrap";
import "@assets/css/styles.css";
import iconLogo from "@assets/img/icon-logo.png";
import TopbarCart from "@components/TopbarCart";
import { BsCheck } from "react-icons/bs";

export default function Topbar(props) {
  const { onFilterBrand, brands, brandFilter, cart } = props;

  console.log("BRAND FILTER TOPBAR", brandFilter);

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <img src={iconLogo} alt="EasyCellShop" width="40" /> EasyCellShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>
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
              <NavDropdown.Item href="#config">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
