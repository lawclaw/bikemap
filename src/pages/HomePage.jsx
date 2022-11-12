import React,{useEffect} from 'react'
import Map from '../components/Map'
import Marker from '../components/Marker'
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const render = (status) => {
  return <h1>{status}</h1>;
};


function HomePage (props) {
  const [positions, setPositions] = React.useState([]);

  useEffect(()=>{
    setPositions([
      {
        lat: 51.757795855861815,
        lng:  -1.2230595517611809,
      },
      {
        lat: 51.767795855861815,
        lng:  -1.2230595517611809,
      }
    ]);
  },[]);
  
  return (
      <>
        <div>Home page</div>
        <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
        <Map>
          {positions.map((latLng,i)=>{
            <Marker key={i} position={latLng} />
          })}
        </Map>
      </Wrapper>
        
      </>
  )
}

export default HomePage
