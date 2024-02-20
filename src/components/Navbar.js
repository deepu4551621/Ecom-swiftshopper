import React from 'react';
import { GiShoppingCart } from "react-icons/gi";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import User from './User';
// const useParams from 
const logo = require('./swiftshopper.jpg');
const NavbarComponent = ({ authToken }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Nav.Link as={Link} to="/">
        <img
          src={logo}
          style={{ borderRadius: 20 }}
          alt="swiftshopper logo"
        /></Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar mx-2'>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <GiShoppingCart size={30} />
          </Nav.Link>
        </Nav>
        <User authToken={authToken} />
      </Navbar.Collapse>
    </Navbar>
  );
};


export default NavbarComponent;
