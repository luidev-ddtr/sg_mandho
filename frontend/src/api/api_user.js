import axios from "axios";
import { validate_edit_account } from "./api_account";
import { crearCuenta } from "./api_account";
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
                success: true
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

export const EditarUsuario = (data) => {

    //Validacion para ver si crear una nueva cuenta o no modificar nada
    const data_account = {
    status: data.estadoPersona.toLowerCase(),  // Del campo estadoPersona del primer payload
    customer_id: data.DIM_CustomerId,      // Del campo DIM_CustomerId del primer payload
    start_date: data.fechaCuenta,                   // Usamos la misma fecha que en el primer payload
    end_date: ""                               // Valor por defecto para nueva cuenta
};

    if  (validate_edit_account(data_account)){
        crearCuenta(data_account);
    }
    

    console.log("Los datos llegaron correctamente a Api.js en EditarUsuario",data);
    return api.post('update_user/', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.data.status === 'success') {
            console.log("Respuesta Datos que llegaron del backend:", response.data.body);
            return {
                data: {     
                    id_user: response.data.body.DIM_CustomerId,
                    first_name: response.data.body.CustomerName,
                    second_name: response.data.body.CustomerMiddleName || '',
                    last_name: response.data.body.CustomerLastName,
                    second_last_name: response.data.body.CustomerSecondLastName || '',
                    date_of_birth: response.data.body.CustomerDateBirth,
                    date_user_start: response.data.body.CustomerStartDate,
                    date_user_end: response.data.body.CustomerEndDate,
                    manzana: response.data.body.CustomerFraction,
                    street: response.data.body.CustomerAddress,
                    number_ext: response.data.body.CustomerNumberExt
                },
                success: true
            };
        } else {
            throw new Error(response.data.message || 'Respuesta inesperada del backend');
        }
    })
    .catch(error => {
        console.error("Error en EditarUsuario:", error);
        throw error;
    });
}


export const DesactivarUsuario = (DIM_CustomerId) => {
    console.log("Nada de esta api esta lsito");
    console.log("Los datos llegaron correctamente a Api.js en DesactivarUsuario",DIM_CustomerId);
}