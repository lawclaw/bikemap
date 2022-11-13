import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import Marker from '../components/Marker'
import { Wrapper } from '@googlemaps/react-wrapper'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import { useRecoilState } from 'recoil'
import { mapLat, mapLng, searchedState, searchQuery, deviceIdState } from '../recoil/states.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/HomePage.module.css'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

function HomePage (props) {
  const [positions, setPositions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')
  const [deviceId, setDeviceId] = useRecoilState(deviceIdState)
  const [modalVote, setModalVote] = useState(34)

  const handleModalClose = () => setShowModal(false)

  // Search features
  const [searched, setSearched] = useRecoilState(searchedState)
  const [search, setSearch] = useRecoilState(searchQuery)
  const [lat, setLat] = useRecoilState(mapLat)
  const [lng, setLng] = useRecoilState(mapLng)

  const handleModalShow = (title, desc, vote) => {
    setModalTitle(title)
    setModalText(desc)
    setShowModal(true)
    setModalVote(34)
  }

  useEffect(async () => {
    const loadPositions = async () => {
      if (searched) {
        console.log(search)
        axios({
          method: 'get',
          url: 'https://nominatim.openstreetmap.org/search?q=' + search + '&format=json'
        })
          .then(function (response) {
            if (response.data[0]) {
              setLat(response.data[0].lat * 1)
              setLng(response.data[0].lon * 1)
            } else {
              setLat(51.757795855861815)
              setLng(-1.2230595517611809)
            }
            setSearched(false)
          })
      }
    }
    loadPositions()
  }, [searched])

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

  console.log(deviceId)

  return (
    <>
      <Wrapper apiKey={GOOGLE_API_KEY}>
        <Map>
          {processedPos.map(({ type, position, title, description, voteNumber }, i) =>
            <Marker key={i} position={position} icon={getIcon(type)} style={{ zIndex: '999' }} onClick={() => { handleModalShow(title, description, voteNumber) }}/>
          )}
        </Map>
      </Wrapper>

      <Modal show={showModal} onHide={handleModalClose} style={{ height: 'auto' }}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Row style={{ height: '300px' }}>
          <Col xs="10" md="10">
            <Modal.Body>{ReactHtmlParser(modalText)}</Modal.Body>
          </Col>
          <Col xs="5" md="2" className={styles.vote}>
            <FontAwesomeIcon icon={faSortUp} className={styles.favicon} />
            <h3>{modalVote}</h3>
            <FontAwesomeIcon icon={faSortDown} className={styles.favicon} />
          </Col>
          <Modal.Footer className={styles.modal_footer}>
            <Button variant="secondary" onClick={handleModalClose} style={{ marginRight: '12px' }}>
                Close
            </Button>
          </Modal.Footer>
        </Row>

      </Modal>
    </>
  )
}

export default HomePage
