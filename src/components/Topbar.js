import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import "@assets/css/styles.css";
import iconLogo from "@assets/img/icon-logo.png";
import TopbarCart from "@components/TopbarCart";

const brands = [
  "ALL",
  "Apple",
  "Huawei",
  "LG",
  "Motorola",
  "Nokia",
  "Samsung",
  "TCL",
];

export default function Topbar() {
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="light"
      variant="light"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img src={iconLogo} alt="EasyCellShop" width="40" /> EasyCellShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>
              <TopbarCart />
            </Nav.Link>
            <NavDropdown title="Brands" id="collasible-nav-dropdown">
              {brands.map((brand) => (
                <NavDropdown.Item href="#">{brand}</NavDropdown.Item>
              ))}
            </NavDropdown>
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
