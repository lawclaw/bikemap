import React, { useState } from 'react'
import { Button, Container, DropdownButton, Dropdown, Form, Row, Col } from 'react-bootstrap'
import ExampleMapPicker from '../components/ExampleMapPicker.jsx'
import axios from 'axios'
import styles from '../styles/AddPage.module.css'

const DefaultLocation = { lat: 51.757795855861815, lng: -1.2230595517611809 }
const MarkerTypes = ['Warning', 'Information', 'Bike Rack']

function AddPage (props) {
  const [location, setLocation] = useState(DefaultLocation)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Marker type')

  function handleSubmit (e) {
    e.preventDefault()

    const req = {
      type,
      user: 'admin',
      lng: location.lng,
      lat: location.lat,
      title,
      description,
      timeUntil: Date.now()
    }

    axios({
      method: 'post',
      url: 'http://localhost:3000/write-pins',
      data: req
    }).then(r => console.log(req))
  }

  return (
    <Container>
      <h1 className="mt-4">Add a Caution</h1>
      <p className="mt-3">You could contribute to our web app by reporting potential hazards to cyclists on the road! It will be shown on the map if enough users think the advice is useful.</p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="12" lg="6">
            <Row>
              <Col xs="12" sm="6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Title</Form.Label>
                  <Form.Control placeholder="Something short to summarise your warning" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs="12" sm="6">
                <Form.Label>Type</Form.Label>
                <select className={styles.select_box} id="dropdown-basic-button" title={type}>
                  {MarkerTypes.map((type, i) => (
                    <option key={i} onClick={() => setType(type)}>
                      {type}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Description on the warning" rows={3} value={description} onChange={(e) => { setDescription(e.target.value) }} />
            </Form.Group>
          </Col>
          <Col xs="12" lg="6">
            <Form.Group>
              <ExampleMapPicker location={location} setLocation={setLocation} DefaultLocation={DefaultLocation}/>
            </Form.Group>
          </Col>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" className="mt-2 py-2" style={{width: "175px"}}>
                        Submit
            </Button>
          </Form.Group>
        </Row>

      </Form>
    </Container>
  )
}

export default AddPage
