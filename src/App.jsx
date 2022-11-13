import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AddPage from './pages/AddPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RecoilRoot, useRecoilState } from 'recoil'
import { Image, Tab, Tabs } from 'react-bootstrap'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

function App () {
  return (
    <RecoilRoot>
      <Tabs
        defaultActiveKey="home"
        className="mb-3"
      >
        <Tab disabled={true} title={
          <>
            <img src={'vite.svg'}/>
            <span>BikeMap</span>
          </>
        }>
        </Tab>
        <Tab eventKey="home" title="Home">
          <HomePage/>
        </Tab>
        <Tab eventKey="add" title="Add Caution">
          <AddPage/>
        </Tab>
      </Tabs>
    </RecoilRoot>
  )
}

export default App
