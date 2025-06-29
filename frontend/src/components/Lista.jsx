import React, { useEffect, useState } from "react";
import { getAlldata } from "../api/api.js";
import { ListaCard } from "./ListaCard.jsx";

function Lista() { 
    const [error, setError] = useState(null);
    const  [datos, setDatos] = useState([]);  

    useEffect(() => {
        console.log("Página cargada (Lista)");
        
        const loadData = async () => {
            try {
                const response = await getAlldata();
                //console.log("Respuesta completa:", response);
                console.log("Datos recibidos este se guarda en el arreglo:", response.data.body);
                setDatos(response.data.body);
            } catch (error) {
                console.error("Error completo:", error);
                if (error.response) {
                    // Error de servidor (4xx, 5xx)
                    console.error("Datos del error:", error.response.data);
                    console.error("Status:", error.response.status);
                    console.error("Headers:", error.response.headers);
                    setError(`Error ${error.response.status}: ${error.response.data.message || 'Error desconocido'}`);
                } else if (error.request) {
                    // La petición fue hecha pero no hubo respuesta
                    console.error("No se recibió respuesta:", error.request);
                    setError("No se recibió respuesta del servidor");
                } else {
                    // Error al configurar la petición
                    console.error("Error de configuración:", error.message);
                    setError("Error al configurar la petición");
                }
            }
        };
        loadData();
    }, []);

return (
    <>
        <div className="border-4 checked:in-only-of-type: color-white">
            <h1 className="font-bold text-2xl color-green">Lista de Clientes</h1>
            {datos.map((dato) =>
                <ListaCard key={dato.id} lista={dato}/>)}
        </div>
    </>
);
}

export default Lista;