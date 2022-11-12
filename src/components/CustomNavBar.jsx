import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

function CustomNavBar (props) {
  return (
      <Navbar>
        <Nav>
            <Navbar.Brand href=".">BikeMap</Navbar.Brand>
            <Nav.Link href={'.'}>
                Home
            </Nav.Link>
            <Nav.Link href={'/add'}>
                Add marker
            </Nav.Link>
            <Nav.Link href={'/search'}>
                Search
            </Nav.Link>
        </Nav>
      </Navbar>
  )
}

export default CustomNavBar
