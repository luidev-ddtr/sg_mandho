import { useState } from 'react'
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter
} from 'react-router-dom';
import './css/style.css';


import Signup from './pages/Singup.jsx';
import Inicio from './pages/Inicio.jsx';
import Menu from './pages/menu.jsx';
import CompanyProfile from './pages/CompanyProfile.jsx';
import Analytics from './pages/Analytics.jsx';
import Customers from './pages/Customers.jsx'; 
import ModalPage from './pages/ModalPage.jsx';
import UserSucces from './pages/UserSucces.jsx';
import UserRegister from './pages/UseRegister.jsx'
//import Navigation from './components/Navigation.jsx';

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
          <Route path='/' element={<CompanyProfile />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/CompanyProfile" element={<CompanyProfile />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/ModalPage" element={<ModalPage />} />
          <Route path="/UserSucces" element={<UserSucces />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
    </>
  )
}

export default App;
