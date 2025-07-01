import axios from "axios";

// Instancia de Axios con la URL base configurada
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/'
});

/**
 * Realiza una petición GET a la API para obtener todos los datos de pruba
 * Simplemente funciona para saber si la conexion se ha establecido correctamente
 * 
 * @returns {Promise<AxiosResponse<any>>} Promesa que se resuelve con la respuesta de la API
 */
export const getAlldata = () => {
    // Usa 'api.get' en lugar de 'axios.get'
    // La URL 'read/' se unirá a la baseURL: 'http://127.0.0.1:5000/api/read/'
    return api.get('read/', {
        //withCredentials: true, // Solo si usas cookies/sesión
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

export const EnviarCredenciass = (data) => { 
    
    // Agrega 'data' como parámetro para enviar el cuerpo de la petición
    // Usa 'api.post' en lugar de 'axios.post'
    console.log("Los datos llegaron correctamente a Api.js en EnviarCredenciass",data);
    return
    return api.post('auth/', data, { // Pasa 'data' como segundo argumento
        //withCredentials: true, // Solo si usas cookies/sesión
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};


export const AgregarUsuario = (data) => { 
    
    // Agrega 'data' como parámetro para enviar el cuerpo de la petición
    // Usa 'api.post' en lugar de 'axios.post'
    console.log("Los datos llegaron correctamente a Api.js en AgregarUsuario",data);
    return
    return api.post('create_user/', data, { // Pasa 'data' como segundo argumento
        //withCredentials: true, // Solo si usas cookies/sesión
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};