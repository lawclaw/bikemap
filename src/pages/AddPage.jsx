import React, {useState} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import ExampleMapPicker from '../components/ExampleMapPicker.jsx'
import axios from 'axios'


const DefaultLocation = { lat: 51.757795855861815, lng: -1.2230595517611809 }

function AddPage (props) {

    const [location, setLocation] = useState(DefaultLocation)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        let req = {
            user: "admin",
            lng: location.lng,
            lat: location.lat,
            title: title,
            description: description,
            timeUntil: Date.now(),
        }

        console.log(req);
        axios({
            method: 'post',
            url: import.meta.env.VITE_BACKEND_LINK+'/write-pins',
            data: req,
          })
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
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </Container>
  )
}

export default AddPage
