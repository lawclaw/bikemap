import React, { useState } from 'react'
import { Button, Container, DropdownButton, Dropdown, Form } from 'react-bootstrap'
import ExampleMapPicker from '../components/ExampleMapPicker.jsx'
import axios from 'axios'

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
        <h1>Add a new marker</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <ExampleMapPicker location={location} setLocation={setLocation} DefaultLocation={DefaultLocation}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => { setDescription(e.target.value) }} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
                <DropdownButton style={{ marginBottom: '5em' }} id="dropdown-basic-button" title={type}>
                  {MarkerTypes.map((type, i) => (
                    <Dropdown.Item key={i} onClick={() => setType(type)}>
                      {type}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>

        </Form>
      </Container>
  )
}

export default AddPage
