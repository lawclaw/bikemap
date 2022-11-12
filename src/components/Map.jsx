import React,{useEffect} from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const GOOGLE_API_KEY = import.meta.env["REACT_APP_GOOGLE_API_KEY"];

const render = (status) => {
  return <h1>{status}</h1>;
};

function Map(props) {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  return (
    <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
      <div ref={ref} style={{width:'100%',height:'400px',margin:'auto'}}/>
    </Wrapper>
  )
} 

export default Map
