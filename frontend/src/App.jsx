import { useState } from "react";
import { VITE_URL_BACKEND } from "../.env";
import { miRuta } from "./pages/miRuta.jsx";

function api(){
  fetch({VITE_URL_BACKEND})
  console.log("Se hizo peticion")
}

function App() {
  
  return (
    <>
      <div>
        <button onClick={sumar}>+1</button>
        <p>{num}</p>
      </div>

      <h1>Hola mundo</h1>
      <div>{VITE_URL_BACKEND}</div>
      <br />
      <br />
      <miRuta />
    </>
  )
}


export default App
