import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AddPage from './pages/AddPage.jsx'

function App () {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/add" element={<AddPage/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
