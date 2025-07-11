import axios from "axios";

// Instancia de Axios con la URL base configurada
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/user/'
});


/**
 * Agrega un nuevo usuario a la base de datos.
 * 
 * @param {object} data - Objeto con los datos del usuario a agregar.
 * @returns {Promise<AxiosResponse>} - Promesa que se resuelve con la respuesta del backend (si todo sale bien).
 * @throws {Error} - Si el backend devuelve un status code fuera del rango 2xx o si el formato de la respuesta no es el esperado.
 */
export const AgregarUsuario = async (data) => { 
    try {
        console.log("Datos enviados a la API:", data);
        
        const response = await api.post('create_user/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log("Respuesta del backend:", response.data);
        
        // Asegúrate de que el backend devuelva el ID en este formato
        if (response.data && response.data.id) {
            return response;
        } else {
            throw new Error('Formato de respuesta inesperado del backend');
        }
    } catch (error) {
        console.error("Error en AgregarUsuario:", error);
        
        // Mejor manejo de errores para el frontend
        if (error.response) {
            // El servidor respondió con un status code fuera del rango 2xx
            const backendError = {
                message: error.response.data?.message || 'Error en el servidor',
                status: error.response.status,
                data: error.response.data
            };
            throw backendError;
        } else {
            throw error;
        }
    }
};


/**
 * Realiza una petición GET a la API para obtener todos los datos de pruba
 * Simplemente funciona para saber si la conexion se ha establecido correctamente
 * Cabe aclar que esta funcion solo es de pruevba ya que no actualmente aun no exites toda la infraestructura
 * 
 * @returns {Promise<AxiosResponse<any>>} Promesa que se resuelve con la respuesta de la API
 */
export const getAlldata = () => {
    // Usa 'api.get' en lugar de 'axios.get'
    // La URL 'read/' se unirá a la baseURL: 'http://127.0.0.1:5000/api/read/'
    return api.post('read_user/', {
        //withCredentials: true, // Solo si usas cookies/sesión
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
            id_user: '-LON-CERR-322h2fwiu',
            filters: {}
        }
    });
};

export const EnviarCredenciass = (data) => { 
    
    // Agrega 'data' como parámetro para enviar el cuerpo de la petición
    // Usa 'api.post' en lugar de 'axios.post'
    console.log("Los datos llegaron correctamente a Api.js en EnviarCredenciass",data);
    return api.post('auth/', data, { // Pasa 'data' como segundo argumento
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