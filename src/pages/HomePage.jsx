import React, { useEffect, useState } from 'react'
import Map from '../components/Map'
import Marker from '../components/Marker'
import { Wrapper } from '@googlemaps/react-wrapper'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import { useRecoilState } from 'recoil'
import { deviceIdState } from '../recoil/states'
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
  const handleModalShow = (title, desc, vote) => {
    setModalTitle(title)
    setModalText(desc)
    setShowModal(true)
    // setModalVote(vote)
    setModalVote(34)
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

      <Modal show={showModal} onHide={handleModalClose}>
        <Row>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Col xs="10" md="11">
            <Modal.Body>{ReactHtmlParser(modalText)}</Modal.Body>
          </Col>
          <Col xs="2" md="1" className={styles.vote}>
            <FontAwesomeIcon icon={faSortUp} className={styles.favicon} />
            <h3>{modalVote}</h3>
            <FontAwesomeIcon icon={faSortDown} className={styles.favicon} />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                  Close
              </Button>
            </Modal.Footer>
          </Col>
        </Row>
       
        
      </Modal>
    </>
  )
}

export default HomePage
