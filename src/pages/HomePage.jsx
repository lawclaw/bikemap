import React from 'react'
import Map from '../components/Map'
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const render = (status) => {
  return <h1>{status}</h1>;
};


function HomePage (props) {
  return (
      <>
        <div>Home page</div>
        <Wrapper apiKey={GOOGLE_API_KEY} render={render}>
        <Map />
      </Wrapper>
        
      </>
  )
}

export default HomePage
