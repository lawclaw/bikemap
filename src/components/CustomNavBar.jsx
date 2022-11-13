import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function CustomNavBar (props) {
  return (
      <Navbar variant={'dark'} style={{backgroundColor: "#03a7cc"}}>
          <Container>

          <Nav>
            <Navbar.Brand href=".">BikeMap</Navbar.Brand>
            <Nav.Link href={'.'}>
                Home
            </Nav.Link>
            <Nav.Link href={'/add'}>
                Add Caution
            </Nav.Link>
            <Nav.Link href={'/search'}>
                Search
            </Nav.Link>
        </Nav>
          </Container>

      </Navbar>
  )
}

export default CustomNavBar
