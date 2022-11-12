import React, { useState } from 'react'
import MapPicker from 'react-google-map-picker'

const DefaultZoom = 10

function ExampleMapPicker ({location, setLocation, DefaultLocation}) {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation)

  
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
                       apiKey={import.meta.env.VITE_GOOGLE_API_KEY}/>
        </>
  )
}

export default ExampleMapPicker
