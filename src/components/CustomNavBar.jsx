import React from 'react'
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { searchedState, searchQuery } from '../recoil/states.js'
import Button from 'react-bootstrap/Button'

function CustomNavBar (props) {
  const [search, setSearch] = useRecoilState(searchQuery)
  const [searched, setSearched] = useRecoilState(searchedState)

  const handleSubmit = () => {
    setSearched(true)
  }

  return (
    <Navbar variant={'dark'} style={{ backgroundColor: '#03a7cc' }}>
      <Container>
        <Nav>
          <Row>
            <Col>
              <Nav.Link href={'.'}>
                <img src="/helmet_blue.png" alt="" style={{height: '32px', width: '32px'}}/>
              </Nav.Link>
            </Col>
            <Col>
              <Navbar.Brand href="." style={{ position: "relative", top: "7px"}}>BikeSafe</Navbar.Brand>
            </Col>
            <Col>
              <Nav.Link href={'.'} style={{ position: "relative", top: "3px"}}>
                Home
              </Nav.Link>
            </Col>
            <Col me='auto' xs={'auto'}>
              <Nav.Link href={'/add'} style={{ position: "relative", top: "3px"}}>
                Add Caution
              </Nav.Link>
            </Col>
            <Col>
              <Form style={{ position: "relative", top: "3px"}}>
                <Form.Control onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSubmit()
                    e.preventDefault()
                  }
                }} onChange={(e) => setSearch(e.target.value)} placeholder={'Search for location'} style={{ width: 'auto' }}/>
              </Form>
            </Col>
            <Col>
              <Button type={'submit'} onClick={handleSubmit}>
                  Search
              </Button>
            </Col>
          </Row>

        </Nav>
      </Container>

    </Navbar>
  )
}

export default CustomNavBar
