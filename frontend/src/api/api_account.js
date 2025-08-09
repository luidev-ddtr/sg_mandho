import axios from "axios";
import { id } from "date-fns/locale/id";

// Instancia de Axios con la URL base configurada
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/account/'
});

/*
Formato en el que se tienen que enviar los datos cuando se crea una nueva cuenta es el siguiente:

fecha de inicio: start_date
fecha de fin: end_date
id de usuario: customer_id

Lo mismo para cuando se quiere leer y se quiere actualizar la cuenta, la ifnormacion de be de ir en este formato 
*/

/**
 * Formatea una fecha string a formato local.
 * 
 * @param {string} dateString - Fecha en formato string.
 * @returns {string} - Fecha formateada o string vacío si no hay fecha.
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  } catch {
    return dateString;
  }
};

/**
 * Crea una nueva cuenta para un cliente.
 * 
 * @param {object} data - Datos de la cuenta a crear en el formato:
 * {
 *   status: "inactivo",
 *   customer_id: string,
 *   start_date: string (YYYY-MM-DD),
 *   end_date: "s/n"
 * }
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor
 * @throws {Error} - Si ocurre algún error durante la creación
 */
export const crearCuenta = async (data) => {
  try {
    // Validación básica de los datos requeridos
    if (!data.customer_id) {
      throw new Error('ID de cliente es requerido');
    }
    if (!data.start_date) {
      throw new Error('Fecha de inicio es requerida');
    }

    const response = await api.post('create/', data);
    
    return {
      success: true,
      message: `Cuenta creada exitosamente para el cliente ${data.customer_id}`,
      data: response.data
    };
  } catch (err) {
    console.error('Error al crear cuenta:', err);
    
    // Mejor manejo de errores para el frontend
    const errorResponse = {
      success: false,
      message: err.response?.data?.message || err.message || 'Error al crear la cuenta',
      status: err.response?.status,
      data: err.response?.data
    };
    
    throw errorResponse;
  }
};

// Funcion para buscar tambien las cuantas asociadas a la personalbar, y mostrar solo como seleccionable la
// que sea activa Tambien. Lo de las cuentas activas se debera ver desde otro ModuleNode, para que 
// no se haga un desorden
// Ejemplo de como se llegarian las cuentas en la funcion
//         Ejemplo de retorno exitoso:
//             data: 
//                    {"success": true, message: "Datos obtenidos correctamente", [
//                 {
//                     "DIM_AccountId": "1qwger$whtwefa",
//                     "customer_id": "juanito torres cruz",
//                     "DIM_RoleId": "Administrador",
//                     "DIM_StatusId": "Activo",
//                     "startDate": "2022-01-01", 
//                     "endDate": "2022-12-31",
//                 }
//                 # ... más registros
//             ]
//                }
export const MostrarCuentas = async (filters) => {
  try {
    const { id_user, status } = filters || {};
    
    if (!id_user) {
      return {
        success: true,
        message: 'ID de usuario no proporcionado',
        data: { body: [] }
      };
    }

    const response = await api.post('read/', { id_user });
    
    // Si la respuesta es un array vacío o no tiene body
    if (Array.isArray(response.data) && response.data.length === 0) {
      return {
        success: true,
        message: 'El usuario no tiene cuentas asociadas',
        data: { body: [] }
      };
    }

    // Obtener las cuentas del formato de respuesta
    let cuentas = [];
    if (response.data && Array.isArray(response.data.body)) {
      cuentas = response.data.body;
      //console.log('Cuentas obtenidas: desde la api xdxd', cuentas);
    } else if (Array.isArray(response.data)) {
      cuentas = response.data;
    }

    // Filtrar por estado activo si se especificó
    let cuentasFiltradas = cuentas;
    if (status) {
      const estadoBuscado = status.toLowerCase();
      cuentasFiltradas = cuentas.filter(cuenta => 
        cuenta.DIM_StatusId?.toLowerCase() === estadoBuscado
      );
    }

    return {
      success: true,
      data: { body: cuentasFiltradas }
    };
    
  } catch (err) {
    //console.error('Error en búsqueda de cuentas:', err);
    
    // Manejo específico para error 404
    if (err.response?.status === 404) {
      return {
        success: true,
        message: 'El usuario no tiene cuentas asociadas',
        data: { body: [] }
      };
    }
    
    return {
      success: false,
      message: err.response?.data?.message || err.message || 'Error al obtener cuentas',
      data: { body: [] }
    };
  }
};


export const validate_edit_account = async (data) => {
  try {
    // Validación básica de los datos requeridos
    console.log("Esta funcion no hace nada aun")
  } catch (error) {
    console.error("Error en validate_edit_account:", error);
    return false;
  }
};