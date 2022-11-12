import React, { useEffect } from 'react'

function Map ({
  children
}) {
  const ref = React.useRef(null)
  const [map, setMap] = React.useState()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: {
          lat: 51.757795855861815,
          lng: -1.2230595517611809
        },
        zoom: 13
      }))
    }
  }, [ref, map])

  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '100vh', margin: 'auto', overflow: 'visible' }}/>
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
