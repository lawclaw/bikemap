import React from 'react'
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { searchQuery } from '../recoil/states.js'

function CustomNavBar (props) {
  const [search, setSearch] = useRecoilState(searchQuery)

  return (
      <Navbar bg={'dark'} variant={'dark'}>
          <Container>
          <Nav>
            <Row>
              <Col>
            <Navbar.Brand href=".">BikeMap</Navbar.Brand>
              </Col>
              <Col>
            <Nav.Link href={'.'}>
                Home
            </Nav.Link>
              </Col>
              <Col me='auto' xs={'auto'}>
            <Nav.Link href={'/add'}>
                Add marker
            </Nav.Link>
              </Col>
              <Col>
                <Form>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder={'Search for location'} style={{ width: 'auto' }}/>
                </Form>
              </Col>
              <Col>
                <Nav.Link href={'/search'}>
                  Search
                </Nav.Link>
              </Col>
            </Row>

          </Nav>
          </Container>

      </Navbar>
  )
}

export default CustomNavBar
