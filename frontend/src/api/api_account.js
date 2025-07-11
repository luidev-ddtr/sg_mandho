import axios from "axios";

// Instancia de Axios con la URL base configurada
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/account/'
});

/**
 * Busca clientes que coincidan con el término de búsqueda.
 * 
 * @param {string} query - Término de búsqueda.
 * @returns {Promise<Array>} - Promesa que se resuelve con un array de clientes filtrados.
 * @throws {Error} - Si ocurre algún error durante la búsqueda.
 */
export const buscarClientes = async (query) => {
  try {
    const response = await api.get('search_client/', {
      params: {
        q: query,
        limit: 10 // Limitar a 10 resultados
      }
    });

    // Mapeamos la respuesta para mantener consistencia con el formato esperado
    return response.data.map(cliente => ({
      id: cliente.id,
      nombre_completo: cliente.nombre_completo,
      direccion: cliente.direccion,
      fecha_creacion: cliente.fecha_creacion,
      manzana: cliente.manzana,
      selectable: cliente.activo, // Asumiendo que 'activo' viene del backend
      ...(cliente.activo ? {} : { reason: cliente.motivo_inactivo })
    }));
  } catch (err) {
    console.error('Error en búsqueda:', err);
    throw err;
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