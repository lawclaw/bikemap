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

const data = [
  {
      "type": "Information",
      "lng": -1.23819,
      "lat": 51.7481,
      "user": "admin",
      "title": "Cycle King",
      "description": "Bike Shop<br /><a href='https://goo.gl/maps/Q7qy3kVEPTgFRvEH7'>View on Google Maps</a>",
      "timeUntil": null,
      "voteNum": 8,
      "id": "6370d34c54ed328477d1"
  },
  {
      "type": "Bike Rack",
      "lng": -1.24459,
      "lat": 51.7504,
      "user": "admin",
      "title": "Sainsbury's",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c582c6b70e74a"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25108,
      "lat": 51.7524,
      "user": "admin",
      "title": "Logic Lane",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 20,
      "id": "6370d34c4f3ae0ff36a2"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25725,
      "lat": 51.7597,
      "user": "admin",
      "title": "University Parks",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c5910cbed7429"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25982,
      "lat": 51.7593,
      "user": "admin",
      "title": "Keble Road",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 11,
      "id": "6370d34c571be888674c"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25565,
      "lat": 51.7545,
      "user": "admin",
      "title": "Blackwell's Bookshop",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 14,
      "id": "6370d34c5d09e87ccc7a"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25844,
      "lat": 51.7543,
      "user": "admin",
      "title": "Magdalen Street",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 8,
      "id": "6370d34c5e442f19d913"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25382,
      "lat": 51.7541,
      "user": "admin",
      "title": "Catte Street",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 5,
      "id": "6370d34c5e07d4e67f0e"
  },
  {
      "type": "Bike Rack",
      "lng": -1.2628,
      "lat": 51.7606,
      "user": "admin",
      "title": "The Mathematical Institute",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 12,
      "id": "6370d34c614137e1a943"
  },
  {
      "type": "Bike Rack",
      "lng": -1.2576,
      "lat": 51.7537,
      "user": "admin",
      "title": "Ship Street",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c61f7c345c4ba"
  },
  {
      "type": "Information",
      "lng": -1.26392,
      "lat": 51.7755,
      "user": "admin",
      "title": "Summertown Cycles",
      "description": "Bike Shop<br /><a href='https://goo.gl/maps/zPqzAcZLmcKk9pVQ8'>View on Google Maps</a>",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c61d85c9b9a87"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25459,
      "lat": 51.7552,
      "user": "admin",
      "title": "Parks Road",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c638738133c77"
  },
  {
      "type": "Bike Rack",
      "lng": -1.24839,
      "lat": 51.754,
      "user": "admin",
      "title": "Longwall Street",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c6404ec5c34bb"
  },
  {
      "type": "Bike Rack",
      "lng": -1.2538,
      "lat": 51.7535,
      "user": "admin",
      "title": "Radcliffe Camera",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 11,
      "id": "6370d34c66dcb8943866"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25774,
      "lat": 51.7519,
      "user": "admin",
      "title": "Queen Street",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 8,
      "id": "6370d34c65d1c93edf80"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25653,
      "lat": 51.7543,
      "user": "admin",
      "title": "Blackwell's Art & Poster Shop",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c666d11a1aaef"
  },
  {
      "type": "Bike Rack",
      "lng": -1.24864,
      "lat": 51.7569,
      "user": "admin",
      "title": "St Cross Road",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c6971d519953b"
  },
  {
      "type": "Bike Rack",
      "lng": -1.24969,
      "lat": 51.7554,
      "user": "admin",
      "title": "Jowett Walk",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 4,
      "id": "6370d34c69755e6f563d"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25392,
      "lat": 51.7583,
      "user": "admin",
      "title": "S Parks Road",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 8,
      "id": "6370d34c6c52b2d9b9d0"
  },
  {
      "type": "Warning",
      "lng": -1.2442,
      "lat": 51.7501,
      "user": "admin",
      "title": "The Plain Roundabout",
      "description": "Accident Hotspot<br />Used by 12,000 bike riders each day, the council says that the roundabout is the busiest in Oxfordshire in terms of flow of cyclists, and one of the most used in the country.<br />It is located where three key routes from south and east Oxford, where most of the city's population lives, meet with those roads - St Clement's Street, Cowley Road and Iffley Road - then funnelled towards Magdalen Bridge and the city centre.<br />A number of the city's bus services pass through the roundabout, as do coach services to and from London and other destinations.",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c6b6d8f86e31c"
  },
  {
      "type": "Warning",
      "lng": -1.25656,
      "lat": 51.7582,
      "user": "admin",
      "title": "Park's Road",
      "description": "Park's Road pedestrian path closed in this section.",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c6e57d873b8a3"
  },
  {
      "type": "Bike Rack",
      "lng": -1.2588,
      "lat": 51.7541,
      "user": "admin",
      "title": "Broad Street",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c6d6ba0b4c247"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25235,
      "lat": 51.7588,
      "user": "admin",
      "title": "S Parks Road",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 4,
      "id": "6370d34c6f360970f7d4"
  },
  {
      "type": "Bike Rack",
      "lng": -1.24835,
      "lat": 51.7532,
      "user": "admin",
      "title": "Magdalen College Back Gate",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c6f40c2469d22"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25748,
      "lat": 51.7543,
      "user": "admin",
      "title": "Broad Street",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 9,
      "id": "6370d34c72554270ba1b"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25862,
      "lat": 51.7543,
      "user": "admin",
      "title": "Magdalen Street East",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c7495d7ef8c98"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25465,
      "lat": 51.7551,
      "user": "admin",
      "title": "Parks Road",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c7521d91700a5"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25805,
      "lat": 51.7597,
      "user": "admin",
      "title": "Keble Road",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 10,
      "id": "6370d34c75dc7b9acdd8"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25042,
      "lat": 51.7527,
      "user": "admin",
      "title": "Queen's Lane",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 8,
      "id": "6370d34c78a1e995cd50"
  },
  {
      "type": "Bike Rack",
      "lng": -1.25623,
      "lat": 51.7578,
      "user": "admin",
      "title": "Parks Road S Parks Road Intersection",
      "description": "Bike Rack",
      "timeUntil": null,
      "voteNum": 12,
      "id": "6370d34c7c63411fa29a"
  }
]

const modalStatusString = {
  "prepare" : "Click on the arrows on the right to vote!",
  "vote_exists" : "You have already voted.",
  "vote_accepted" : "You have successfully voted.",

}
function HomePage (props) {
  const [positions, setPositions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')
  const [deviceId, setDeviceId] = useRecoilState(deviceIdState)
  const [modalVote, setModalVote] = useState(0)
  const [modalId, setModalId] = useState("")
  const [modalStatus,setModalStatus] = useState("prepare")

  const handleModalClose = () => setShowModal(false)

  // Search features
  const [searched, setSearched] = useRecoilState(searchedState)
  const [search, setSearch] = useRecoilState(searchQuery)
  const [lat, setLat] = useRecoilState(mapLat)
  const [lng, setLng] = useRecoilState(mapLng)

  const handleModalShow = (title, desc, vote, id) => {
    setModalTitle(title)
    setModalText(desc)
    setShowModal(true)
    setModalVote(vote)
    setModalId(id)
    setModalStatus("prepare")
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
    setPositions(data)
    // const loadPositions = async () => {
    //   axios({
    //     method: 'get',
    //     url: import.meta.env.VITE_BACKEND_LINK + '/read-pins'
    //   })
    //     .then(function (response) {
    //       console.log(response.data.documents)
    //       setPositions(response.data.documents)
    //     })
    // }
    // loadPositions()
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

  const voteUp = (id) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/vote-pin?id='+id+"&deviceId="+deviceId,
    }).then(res => {
      console.log(res.data)
      setModalStatus(res.data.status)
      if (res.data.document){
        setModalVote(res.data.document.voteNum)
      }
    })
  }

  const voteDown = (id) => {
    // TODO
  }

  console.log(deviceId)

  return (
    <>
      <Wrapper apiKey={GOOGLE_API_KEY}>
        <Map>
          {processedPos.map(({ type, position, title, description, voteNum, id }, i) =>
            <Marker key={i} position={position} icon={getIcon(type)} style={{ zIndex: '999' }} onClick={() => { handleModalShow(title, description, voteNum, id) }}/>
          )}
        </Map>
      </Wrapper>

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Row>
          <Col xs="7" md="10">
            <Modal.Body>{ReactHtmlParser(modalText)}<br />{modalStatusString[modalStatus]}</Modal.Body>
          </Col>
          <Col xs="5" md="2" className={"my-3 "+styles.vote}>
            <FontAwesomeIcon icon={faSortUp} className={styles.favicon} onClick={()=>voteUp(modalId)}/>
            <h3>{modalVote}</h3>
            {/* <FontAwesomeIcon icon={faSortDown} className={styles.favicon}onClick={()=>voteDown(modalId)}/> */}
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
