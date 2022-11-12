import React,{useEffect} from 'react';
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
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: {
          lat: 51.757795855861815,
          lng: -1.2230595517611809,
        },
        zoom: 10,
      }));
    }
  }, [ref, map]);

  // useDeepCompareEffectForMaps(() => {
  //   if (map) {
  //     map.setOptions(options);
  //   }
  // }, [map, options]);

  // useEffect(() => {
  //   if (map) {
  //     ["click", "idle"].forEach((eventName) =>
  //       google.maps.event.clearListeners(map, eventName)
  //     );
  //     if (onClick) {
  //       map.addListener("click", onClick);
  //     }
  
  //     if (onIdle) {
  //       map.addListener("idle", () => onIdle(map));
  //     }
  //   }
  // }, [map, onClick, onIdle]);
  
  return (
    <div ref={ref} style={{width:'100%',height:'400px',margin:'auto', overflow: "visible"}}/>
  )
} 

export default Map
