import axios from "axios";

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
 * @param {object} data - Datos de la cuenta a crear.
 * @returns {Promise<object>} - Promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} - Si ocurre algún error durante la creación.
 */
export const crearCuenta = async (data) => {
  try {
    const response = await api.post('create_account/', data);
    return {
      success: true,
      message: `Cuenta creada exitosamente para ${data.cliente}`,
      data: response.data
    };
  } catch (err) {
    console.error('Error al crear cuenta:', err);
    throw err;
  }
};




// Funcion para buscar tambien las cuantas asociadas a la personalbar, y mostrar solo como seleccionable la
// que sea activa Tambien. Lo de las cuentas activas se debera ver desde otro ModuleNode, para que 
// no se haga un desorden
export const MostrarCuentas  = async (id_usuario) => {
  try {
      const response = await api.post('read_accounts/', id_usuario);
      return {
        success: true,
        message: 'Cuentas obtenidas exitosamente',
        data: response.data
      };
  } catch (err) {
    console.error('Error en busqueda de cuentas:', err);
    throw err;  // Relanza el error para manejo superior
  }
}