//import Navigate from "../components/Navigate";
import React, { useState } from "react";
import Lista from "../components/Lista";
import SideBar from "../partials/SideBar";
    
/**
 * Este es el menu principal
 * 
 * Contiene un header con un titulo, un enlace a React, y un componente
 * Lista que muestra una lista de personas
 * 
 * @returns {JSX.Element} El menu principal
 */

function Menu () {

        //const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="bg-gray-800 ">
            <header className=" active: col-end-11">
                <h1 className="font-bold ring-white *:peer-focus-within:">Este es el menu Principal</h1>
                <p className="font-bold ring-white">Menu</p>
                <a 
                    className="font-bold ring-white in-enabled:"
                    //href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                ></a>
                <Lista/>
            </header>
        </div>
    );
}

export default Menu;