import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { mapLat, mapLng } from '../recoil/states.js'

function Map ({ children }) {
  const ref = React.useRef(null)
  const [map, setMap] = React.useState()
  const [lat, setLat] = useRecoilState(mapLat)
  const [lng, setLng] = useRecoilState(mapLng)

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: {
          lat,
          lng
        },
        zoom: 13
      }))
    }
  }, [ref, map])

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, {
      center: {
        lat,
        lng
      },
      zoom: 13
    }))
  }, [lat, lng])
  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '94vh', margin: 'auto', overflow: 'visible' }}/>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // console.log("element cloned")
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

export default Map
