import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AddPage from './pages/AddPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RecoilRoot } from 'recoil'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import CustomNavBar from './components/CustomNavBar.jsx'

function App () {
  return (
    <RecoilRoot>
      <CustomNavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/add" element={<AddPage/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
