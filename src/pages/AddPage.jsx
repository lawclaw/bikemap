import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import ExampleMapPicker from '../components/ExampleMapPicker.jsx'

function AddPage (props) {
  return (
      <Container>
        <h1>Add a new marker</h1>
        <Form>
            <Form.Group>
                <ExampleMapPicker/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </Container>
  )
}

export default AddPage
