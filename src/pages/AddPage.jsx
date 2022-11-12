import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import ExampleMapPicker from '../components/ExampleMapPicker.jsx'

function AddPage (props) {
  return (
      <Container>
        <h1>Add a new marker</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
            Well never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <ExampleMapPicker/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
          Submit
            </Button>
        </Form>
      </Container>
  )
}

export default AddPage
