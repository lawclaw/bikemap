import React, { useState } from 'react'
import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 51.757795855861815, lng: -1.2230595517611809 }
const DefaultZoom = 10

function ExampleMapPicker (props) {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation)

  const [location, setLocation] = useState(defaultLocation)
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
            <label>Latitude:</label>
            <input type='text' value={location.lat} disabled/>
            <label>Longitude:</label>
            <input type='text' value={location.lng} disabled/>
            <button onClick={handleResetLocation}>Reset Location</button>

            <MapPicker defaultLocation={defaultLocation}
                       zoom={zoom}
                       mapTypeId="roadmap"
                       style={{ height: '50vh' }}
                       onChangeLocation={handleChangeLocation}
                       onChangeZoom={handleChangeZoom}
                       apiKey='AIzaSyCSMHRIorKn8cu2RmobustnTx664WI_HuI'/>
        </>
  )
}

export default ExampleMapPicker
