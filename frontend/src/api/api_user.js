import axios from "axios";
import { validate_edit_account } from "./api_account";
import { crearCuenta } from "./api_account";
import { isValid } from "date-fns/isValid";
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
        // 1. Crear el usuario primero
        const userResponse = await api.post('create_user/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!userResponse.data || userResponse.data.status !== 'success') {
            throw new Error(userResponse.data?.message || 'Error al crear el usuario');
        }
        // Obtener ID del usuario creado
        const userId = userResponse.data.body.id;
        if (!userId) {
            throw new Error('No se recibió ID de usuario del backend');
        }

        // 2. Preparar y crear la cuenta asociada
        const accountPayload = {
            customer_id: userId,
            start_date: data.data.fecha_inicio, // Acceder a data.data ya que el payload está anidado
            end_date: data.data.fecha_fin,
            status: data.data.estadoPersona.toLowerCase(),
        };

        console.log('Información para crear la cuenta:', accountPayload);
        
        // Crear la cuenta asociada
        const accountResponse = await crearCuenta(accountPayload);
        console.log("Respuesta de creación de cuenta:", accountResponse);

        // 3. Verificar que ambas operaciones fueron exitosas (ajustado a estructura real)
        if (userResponse.data.status === 'success' && (accountResponse.success || accountResponse.data?.status === 'success')) {
            return { id: userId };
        } else {
            throw new Error(accountResponse.message || 'Error en la creación de la cuenta asociada');
        }
    } catch (error) {
        console.error("Error en AgregarUsuario:", error);
        throw error;
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
        if (!response.data) {
            throw new Error('No se recibieron datos del backend');
        }

        if (response.data.status === 'success') {
            return {
                data: response.data.body,
                success: true
            };
        } else {
            // Usamos el mensaje del backend si existe
            throw new Error(response.data.message || 'Respuesta inesperada del backend');
        }
    })
    .catch(error => {
        console.error("Error en MostrarUsuarios:", error);
        
        // Priorizamos el mensaje del backend si está disponible
        const errorMessage = error.response?.data?.message 
            || error.message 
            || 'Error al cargar los usuarios';
        
        throw new Error(errorMessage);
    });
}


export const EditarUsuario = async (data) => {
    //Validacion para ver si crear una nueva cuenta o no modificar nada
    const data_account = {
        status: data.estadoPersona,
        customer_id: data.DIM_CustomerId,
        start_date: data.fechaCuenta,
        end_date: "",
        orginal_status: data.EstadoPersonaOriginal,
    };

    const shouldCreateAccount = await validate_edit_account(data_account);
    if (shouldCreateAccount) {
        console.log("hubo cuenta");
        crearCuenta(data_account);
    }
    else {
        console.log("no hubo cuenta");
    }
    
    return api.post('update_user/', data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.data.status === 'success') {
            return {
                data: normalizeUserData(response.data.body),
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
// API.js
export const DesactivarUsuario = (DIM_CustomerId) => {
    if (!DIM_CustomerId) {
        
        return Promise.reject(new Error("ID de usuario no proporcionado"));
    }

    return api.patch('delete_user/', {
        DIM_CustomerId: DIM_CustomerId
    }).then(response => {
        
        if (response.data.status === 'success') {
            
            const normalizedData = normalizeUserData(response.data.body);
            
            return {
                success: response.data.status,
                data: normalizedData
            };
        } else {
            throw new Error(response.data.message || 'Respuesta inesperada del backend');
        }
    }).catch(error => {
        console.error("[API] 5. Error en DesactivarUsuario:", {
            error: error,
            responseData: error.response?.data,
            status: error.response?.status
        });
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    });
};

const normalizeUserData = (userData) => {
    return {
        id_user: userData.DIM_CustomerId,
        first_name: userData.CustomerName,
        second_name: userData.CustomerMiddleName || '',
        last_name: userData.CustomerLastName,
        second_last_name: userData.CustomerSecondLastName || '',
        date_of_birth: userData.CustomerDateBirth,
        date_user_start: userData.CustomerStartDate,
        date_user_end: userData.CustomerEndDate,
        manzana: userData.CustomerFraction,
        street: userData.CustomerAddress,
        number_ext: userData.CustomerNumberExt
    };
};