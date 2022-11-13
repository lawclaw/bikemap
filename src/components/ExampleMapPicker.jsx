import React, { useState } from 'react'
import MapPicker from 'react-google-map-picker'
import { Form, Button, Row, Col } from 'react-bootstrap'

const DefaultZoom = 10

function ExampleMapPicker ({ location, setLocation, DefaultLocation }) {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation)

  const [zoom, setZoom] = useState(DefaultZoom)

  function handleChangeLocation (lat, lng) {
    setLocation({ lat, lng })
  }

  function handleChangeZoom (newZoom) {
    setZoom(newZoom)
  }

  function handleResetLocation () {
    setDefaultLocation({ ...DefaultLocation })
    setZoom(DefaultZoom)
  }

  return (
    <>
      <Row>
        <Col xs = "4" className="my-2">
          <Form.Group>
            <Form.Label>Latitude:</Form.Label>
            <Form.Control type='text' value={location.lat} disabled/>
          </Form.Group>
        </Col>
        <Col xs = "4" className="my-2">
          <Form.Group>
            <Form.Label>Longitude:</Form.Label>
            <Form.Control type='text' value={location.lng} disabled/>
          </Form.Group>
        </Col>
        <Col xs = "4" className="my-2" style={{alignItems: "center", display: "flex"}}>
          <Button onClick={handleResetLocation}>Reset Location</Button>
        </Col>
      </Row>
      <MapPicker defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: '50vh' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}/>
    </>
  )
}

export default ExampleMapPicker
