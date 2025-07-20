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
import CompanyProfile from './pages/CompanyProfile.jsx';
import Analytics from './pages/Analytics.jsx';
import ModalPage from './pages/ModalPage.jsx';
import DynamicModule from './pages/DynamicModule.jsx';

//Personas modulo
import Customers from './pages/personas/Customers.jsx'; 
import UserSucces from './pages/personas/UserSucces.jsx';
import UserRegister from './pages/personas/UseRegister.jsx';
import Cuenta from './pages/personas/Cuenta.jsx';
import Panteon from './pages/panteon/PanteoRegistro.jsx';
//import Navigation from './components/Navigation.jsx';

/**
 * The main application component that sets up routing for the application.
 * It includes various routes for different pages like CompanyProfile, Menu, 
 * Signup, Inicio, Analytics, Customers, ModalPage, UserSuccess, UserRegister, 
 * and Cuenta. It also handles scroll behavior on route changes.
 */

/**
 * The App component sets up the main routing structure for the application.
 * It listens for changes in the route location and adjusts the scroll behavior
 * accordingly to ensure smooth navigation. The component defines various routes
 * corresponding to different pages such as CompanyProfile, Signup, Analytics,
 * ModalPage, DynamicModule, UserSuccess, Cuenta, UserRegister, and Customers.
 * Each route renders its respective component when navigated to, providing
 * a seamless single-page application experience.
 */

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
          <Route path="/Signup" element={<Signup />} />
          <Route path="/CompanyProfile" element={<CompanyProfile />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/ModalPage" element={<ModalPage />} />
          <Route path="/modulo/:moduleName" element={<DynamicModule />} />

          <Route path="/personas/registro_exito/:id" element={<UserSucces />} />
          <Route path="/personas/Cuenta" element={<Cuenta />} />
          <Route path="/personas/registro" element={<UserRegister />} />
          <Route path="/personas/usuarios" element={<Customers />} />

          <Route path="/panteon/generar" element={<Panteon />} />


        </Routes>
    </>
  )
}

export default App;
