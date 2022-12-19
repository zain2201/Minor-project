import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { Modall } from "./Modall";

const NavbarTop = () => {
  return (
    <>
     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CodeHere</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home"><h1>Home</h1></Nav.Link> */}
            <Nav.Link href="#home"><Modall/></Nav.Link>

            {/* <Nav.Link href="#features">Features</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      </>
  )
}

export default NavbarTop