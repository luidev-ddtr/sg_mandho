import axios from "axios";

// Instancia de Axios con la URL base configurada
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/user/'
});


/**
 * Los datos para el formulario de ususario deben de ir en este orden en el json
 * 
 * Solamente cuando se envian del frontend al backend
 * id de usuario: id_user
 * nombre: nombre
 * segundo nombre: segundo_nombre
 * apellido: apellido
 * segundo apellido: segundo_apellido
 * fecha de nacimiento: fecha_nacimiento
 * fecha de inicio: fecha_inicio
 * fecha de fin: fecha_fin
 * manzana: manzana
 * calle: calle
 * numero exterior: numero
 * 
 * Cuando se reciben del backend vendran en este formato
 * 
 * id de usuario: id_user
 * nombre: first_name`
 * segundo nombre: second_name
 * apellido: last_name
 * segundo apellido: second_last_name
 * fecha de nacimiento: date_of_birth
 * fecha de inicio: date_user_start
 * fecha de fin: date_user_end
 * manzana: user_manzana
 * calle: user_street
 * numero exterior: user_number_ext
 * 
 * **/

/**
 * Agrega un nuevo usuario a la base de datos.
 * 
 * @param {object} data - Objeto con los datos del usuario a agregar.
 * @returns {Promise<AxiosResponse>} - Promesa que se resuelve con la respuesta del backend (si todo sale bien).
 * @throws {Error} - Si el backend devuelve un status code fuera del rango 2xx o si el formato de la respuesta no es el esperado.
 */
export const AgregarUsuario = async (data) => { 
    try {
        const response = await api.post('create_user/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log("Respuesta completa del backend:", response); // Verifica toda la respuesta
        
        // Asegúrate de que response.data existe
        if (!response.data) {
            throw new Error('No se recibieron datos del backend');
        }

        // Verifica la estructura esperada
        if (response.data.status === 'success') {
            return {
                id: response.data.body.id,
            };
        } else {
            throw new Error(response.data.message || 'Respuesta inesperada del backend');
        }
    } catch (error) {
        console.error("Error en AgregarUsuario:", error);
        throw error; // Re-lanza el error para manejarlo en el componente
    }
}

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


/**
 * Realiza una petición GET a la API para obtener la lista de usuarios.
 * 
 * @returns {Promise<AxiosResponse>} - Promesa que se resuelve con la respuesta del backend, conteniendo los datos de los usuarios.
 * @throws {Error} - Si ocurre un error durante la petición HTTP.
 */

export const MostrarUsuarios = (data) => {
    return api.post('read_user/', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        //console.log("Respuesta completa del backend:", response);
        
        // Asegúrate que response.data existe
        if (!response.data) {
            throw new Error('No se recibieron datos del backend');
        }

        // Verifica la estructura esperada
        if (response.data.status === 'success') {
            return {
                data: response.data.body,
                // Agrega otros campos si son necesarios
            };
        } else {
            throw new Error(response.data.message || 'Respuesta inesperada del backend');
        }
    })
    .catch(error => {
        console.error("Error en MostrarUsuarios:", error);
        throw error; // Re-lanza el error para manejarlo en el componente
    });
};


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