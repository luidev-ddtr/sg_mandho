import { useState } from 'react'
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter
} from 'react-router-dom';
import './css/style.css'

import Signup from './pages/Singup.jsx';
import Inicio from './pages/Inicio.jsx';
import Menu from './pages/menu.jsx';
import Navigation from './components/Navigation.jsx';



function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <> 
        <Navigation/>
        <Routes>
          <Route path='/' element={<Menu/>} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Inicio" element={<Inicio />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
    </>
  )
}

export default App;
