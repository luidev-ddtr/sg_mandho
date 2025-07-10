import SideBar from "../partials/SideBar";
import Header from "../partials/Header";
import { useState } from "react";

function inicio() {


    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="bg-gray-800 ">
                  {/* Sidebar */}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    

            <header className=" active: col-end-11">
                
                <p className="font-bold ring-white">
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a 
                    className="font-bold ring-white in-enabled:"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                
            </header>
        </div>
    );
}

export default inicio;