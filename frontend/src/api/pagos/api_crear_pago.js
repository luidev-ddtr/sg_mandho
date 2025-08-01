//src/api/pagos/api_crear_pago.js
import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/pagos/'
});

/**
 * esta funcion sera el handler de pagos de todas las comitivas, se una funcion 
 * la cual se conectara con el backend y se encargara de crear un pago
 * se le pasara un objeto con los siguientes datos:
 * {
 *   En primer lugar irian los datos de la persona que hace de administrador de la comitiva
 * ESOS DATOS AUN NO ESTAN DISPONIBLES
 * 
 * Sigen los datos del formulario sera bastanten informacion, ya 
 * que vendra tanto detalles del servicio, detalles de la comitiva,
 * detalles del pago, y detalles del cliente
 * * {
 *   comitiva_id: string, // ID de la comitiva
 *   customer_id: string, // ID del cliente
 *  service_id: string, // ID del servicio}
 * **/
export const crearRegistroPago = async (data) => {
    try {

        if (!data.DIM_AccountId || !data.DIM_CustomerId || !data.ServiceName) return; //modificar

        console.log("Datos enviados para crear el pago:", data);

    //     const response = await api.post('create/', data);

    // return { data: response.data }; // Asigna los datos = response.data;
    } catch (error) {
        console.log(error);
    }
};