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

export const MostrarUsuarios = ( ) => {

    // Usa 'api.get' en lugar de 'axios.get'
    return api.get('read_user/', {
        //withCredentials: true, // Solo si usas cookies/sesión
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
} 


export const MostrarUsuarios1 = ( ) => {

    // Usa 'api.get' en lugar de 'axios.get'
    console.log("Estoy en MostrarUsuarios1, Funcion de prueba para cargar usarios ");
    return (
        [
        {
        "id_user": "1",
        "first_name": "Guadalupe",
        "second_name": "Maria",
        "last_name": "Torres",
        "second_last_name": "Garcia",
        "date_of_birth": "1990-01-01",
        "date_user_start": "2022-01-01",
        "date_user_end": "2025-12-31",
        "user_manzana": "Tepetate",
        "user_street": "Main Street",
        "user_number_ext": "123",
        "image": "Image01"
    },
        ]
    )
} 