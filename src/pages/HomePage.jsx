import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import Marker from '../components/Marker'
import { Wrapper } from '@googlemaps/react-wrapper'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { searchQuery } from '../recoil/states.js'
import Geocode from 'react-geocode'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

function HomePage (props) {
  const [positions, setPositions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')
  const handleModalClose = () => setShowModal(false)

  const [search, setSearch] = useRecoilState(searchQuery)

  useEffect(async () => {
    console.log(search)
    Geocode.fromAddress('Eiffel Tower').then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        console.log(lat, lng)
      },
      (error) => {
        console.error(error)
      }
    )
  }, [search])

  const handleModalShow = (title, desc) => {
    setModalTitle(title)
    setModalText(desc)
    setShowModal(true)
    // console.log("show");
  }

  useEffect(() => {
    const loadPositions = async () => {
      axios({
        method: 'get',
        url: import.meta.env.VITE_BACKEND_LINK + '/read-pins'
      })
        .then(function (response) {
          console.log(response.data.documents)
          setPositions(response.data.documents)
        })
    }
    loadPositions()
  }, [])

  useEffect(() => {
    Geocode.setApiKey(GOOGLE_API_KEY)
  }, [])

  const processedPos =
    positions.map(pos => {
      return {
        position:
          {
            lat: pos.lat,
            lng: pos.lng
          },
        ...pos
      }
    })

  const getIcon = (type) => {
    switch (type) {
      case 'Warning':
        return 'warning.ico'
      case 'Information':
        return 'information.ico'
      case 'Bike Rack':
        return 'bike.ico'
    }
  }

  return (
      <>
        <Wrapper apiKey={GOOGLE_API_KEY}>
          <Map>
            {processedPos.map(({ type, position, title, description }, i) =>
              <Marker key={i} position={position} icon={getIcon(type)} style={{ zIndex: '999' }} onClick={() => { handleModalShow(title, description) }}/>
            )}
          </Map>
        </Wrapper>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
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
      </>
  )
}

export default HomePage
