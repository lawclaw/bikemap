import React from 'react'

const Marker = (options) => {
  const [marker, setMarker] = React.useState()

  const infowindow = new google.maps.InfoWindow({
    content: 'Hello',
    ariaLabel: 'Uluru'
  })

  React.useEffect(() => {
    if (!marker) {
      const marker = new google.maps.Marker()
      marker.addListener('click', () => {
        options.onClick()
      })
      setMarker(marker)
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])
  return null
}

export default Marker
