import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//Forma que react hace, reac se encarga de hace todo esto por si solo,
//  mejorando la expreciencia de desarrollo
// const div = document.createElement("div")
// div.appendChild(doc)