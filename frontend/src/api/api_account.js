import axios from "axios";

// Instancia de Axios con la URL base configurada
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/account/'
});

/**
 * Realiza una búsqueda de clientes en el servidor basada en un término de búsqueda
 * y transforma los resultados en un formato estandarizado para el frontend.
 * 
 * @param {string} query - Término de búsqueda (mínimo 3 caracteres recomendado).
 *                        Puede buscar por: nombre, apellido, ID de usuario o manzana.
 *                        Ejemplo: "Juan Pérez" o "YHONDA"
 * 
 * @returns {Promise<Array<{
 *   id: string,
 *   nombre_completo: string,
 *   direccion: string,
 *   fecha_creacion: string,
 *   manzana: string,
 *   selectable: boolean,
 *   reason: string
 * }>>} - Promesa que resuelve a un array de objetos con:
 *        - id: Identificador único del cliente
 *        - nombre_completo: Nombre completo formateado
 *        - direccion: Dirección concatenada
 *        - fecha_creacion: Fecha de registro del cliente
 *        - manzana: Zona/área del cliente
 *        - selectable: Siempre true (todos seleccionables)
 *        - reason: Cadena vacía (reservado para mensajes de inactividad)
 * 
 * @throws {Error} - Cuando:
 *                  - La petición HTTP falla (error de red, servidor no disponible)
 *                  - El servidor devuelve un status code diferente a 2xx
 *                  - La respuesta no tiene el formato esperado
 * 
 * @example
 * // Uso básico
 * buscarClientes('torres')
 *   .then(clientes => console.log(clientes))
 *   .catch(error => console.error(error));
 * 
 * @example
 * // Resultado de ejemplo
 * [
 *   {
 *     id: "JUA-LON-CERR-322h2fwiu",
 *     nombre_completo: "John s/n Torres",
 *     direccion: "Main Street s/n",
 *     fecha_creacion: "2022-01-01",
 *     manzana: "Yhonda",
 *     selectable: true,
 *     reason: ""
 *   }
 * ]
 */
export const buscarClientes = async (query) => {
  try {
    // 1. Realiza petición GET al endpoint 'search_client'
    const response = await api.get('search_client/', {
      params: {
        q: query  // Parámetro de búsqueda enviado en la URL como query string
      }
    });

    // 2. Transforma la respuesta del servidor
    return response.data.results.map(cliente => ({
      // ID del cliente (usa cliente.id como primario, falla a cliente.data.user_id)
      id: cliente.id || cliente.data?.user_id || '',
      
      // Nombre completo combinando first_name, second_name y last_name
      nombre_completo: `${cliente.data?.first_name || ''} ${cliente.data?.second_name || ''} ${cliente.data?.last_name || ''}`.trim(),
      
      // Dirección combinando street y number_ext
      direccion: `${cliente.data?.street || ''} ${cliente.data?.number_ext || ''}`.trim(),
      
      // Fecha de inicio del usuario (date_user_start)
      fecha_creacion: cliente.data?.date_user_start || '',
      
      // Manzana/zona del cliente
      manzana: cliente.data?.manzana || '',
      
      // Flag de disponibilidad (siempre true en esta implementación)
      selectable: cliente.data.selectable  ||true,
      
      // Motivo de inactividad (siempre vacío en esta implementación)
      reason: cliente.data.reason  ||''
    }));
    
  } catch (err) {
    console.error('Error en búsqueda:', err);
    throw err;  // Relanza el error para manejo superior
  }
};

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