//src/api/pagos/api_crear_pago.js
import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/payment/'
});

export const crearRegistroPago = async (data) => {
    try {
        // Validación corregida de campos requeridos
        if (!data.DIM_AccountId || !data.DIM_CustomerId || !data.ServiceName || !data.DIM_OnwerCustomerId 
            || !data.serviceDetailsType || !data.amount || !data.AnioPago || !data.FactAmount ) {
            throw new Error('Faltan campos requeridos para crear el pago');
        }
        
        console.log("Datos enviados para crear el pago:", data);
        const response = await api.post('create/', data);
        
        console.log("Respuesta del servidor:", response.data);
        
        // Devolvemos toda la respuesta, no solo los datos
        return {
            success: response.data.status || false,
            message: response.data.message ,
            data: response.data
        };
        
    } catch (error) {
        // Manejo mejorado de errores
        let errorMessage = 'Error desconocido al crear el pago';
        
        if (error.response) {
            // El servidor respondió con un status fuera del rango 2xx
            console.error("Error de respuesta:", error.response.data);
            errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          `Error ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error("No se recibió respuesta:", error.request);
            errorMessage = 'No se recibió respuesta del servidor';
        } else {
            // Algo pasó en la configuración de la petición
            console.error("Error de configuración:", error.message);
            errorMessage = error.message || 'Error al configurar la petición';
        }
        
        throw new Error(errorMessage);
    }
};