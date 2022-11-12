import React,{useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const render = (status) => {
  return <h1>{status}</h1>;
};

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// function Map(){
//   const defaultProps = {
//     center: {
//       lat: 10.99835602,
//       lng: 77.01502627
//     },
//     zoom: 11
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent
//           lat={59.955413}
//           lng={30.337844}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }

function Map(props) {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  useEffect(() => {
    console.log(GOOGLE_API_KEY)
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 4,
      }));
      console.log("if clause")
    }
    console.log(map);
    console.log(ref);
  }, [ref, map]);

  return (
    <div ref={ref} style={{width:'100%',height:'400px',margin:'auto', overflow: "visible"}}/>
  )
} 

export default Map
