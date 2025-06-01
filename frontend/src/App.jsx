import { useState } from "react";
import { VITE_URL_BACKEND } from "../.env";

function api(){
  fetch({VITE_URL_BACKEND})
  console.log("Se hizo peticion")
}

function App() {
  //Estado
  const [num,setNum] = useState('');

  const sumar = () => {
  setNum(num+'fstring')
  }
  return (
    <>
      <div>
        <button onClick={sumar}>+1</button>
        <p>{num}</p>
      </div>
      <div>{VITE_URL_BACKEND}</div>
    </>
  )
}


//INCOMPLETO NO FUNCIONA 
export default App
