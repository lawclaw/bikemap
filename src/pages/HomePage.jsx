import React,{useEffect, useState} from 'react'
import Map from '../components/Map'
import Marker from '../components/Marker'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const render = (status) => {
  return <h1>{status}</h1>;
};


function HomePage (props) {
  const [positions, setPositions] = React.useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const handleModalClose = () => setShowModal(false);
  
  const handleModalShow = (desc) => {
    setModalText(desc);
    setShowModal(true);
    // console.log("show");
  }

  useEffect(()=>{
    setPositions([
      {
        lat: 51.757795855861815,
        lng:  -1.2230595517611809,
        descriptions: "HELLO WORLD",
      },
      {
        lat: 51.767795855861815,
        lng:  -1.2230595517611809,
        descriptions: "HAHA",
      }
    ]);
  },[]);

  // console.log(positions);
  
  const processedPos =   
    positions.map(pos => {
      return {
        position: 
          {
            lat: pos.lat, 
            lng: pos.lng,
          },
        ...pos,
      }
    });
    
  return (
      <>
        <div>Home page</div>

        <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
          <Map>
            {processedPos.map(({position,descriptions},i)=>
              <Marker key={i} position={position} icon="warning.png" style={{zIndex: "999"}} onClick={()=>{handleModalShow(descriptions)}}/>
            )}
          </Map>
        </Wrapper>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleModalClose}>
              Save Changes
            </Button>
          </Modal.Footer>
      </Modal>
      <p  onClick={()=>{handleModalShow("bye")}} >Hello</p>
      </>
  )
}

export default HomePage
