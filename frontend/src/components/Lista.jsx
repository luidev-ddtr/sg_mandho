import React, { useEffect, useState } from "react";
import { getAlldata } from "../api/api.js";

function Lista() { 
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Página cargada (Lista)");
        
        const loadData = async () => {
            try {
                const response = await getAlldata();
                console.log("Respuesta completa:", response);
                console.log("Datos recibidos:", response.data);
                setData(response.data);
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
            <h1 className="text-3xl color-white">Lista</h1>
            <p>Lista donde se mostrara la info para interactuar con el backend</p>
            
            {error && (
                <div className="text-red-500 mt-4">
                    Error: {error}
                </div>
            )}

            {data && (
                <div className="mt-4">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </>
    );
}

export default Lista;