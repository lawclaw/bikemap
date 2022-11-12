import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AddPage from './pages/AddPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavBar from './components/CustomNavBar.jsx'
import { RecoilRoot } from 'recoil'
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
