import { useState } from 'react'
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './css/style.css'

import Signup from './pages/Singup.jsx';
import Inicio from './pages/Inicio.jsx';


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route excat path='/' element={<Signup />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </>
  )
}

export default App
