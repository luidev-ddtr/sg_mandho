import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/search/'
})
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
export const buscarClientes = async (query, signal = null) => {
  try {
    // Configuración de la petición con posibilidad de cancelación
    const config = {
      params: { q: query }
    };
    
    // Agregar señal de cancelación si está disponible
    if (signal) {
      config.signal = signal;
    }

    // Realizar petición GET con manejo de cancelación
    const response = await api.get('search_client/', config);

    // Transformar la respuesta del servidor
    return response.data.results.map(cliente => ({
      id: cliente.id || cliente.data?.user_id || '',
      nombre_completo: `${cliente.data?.first_name || ''} ${cliente.data?.second_name || ''} ${cliente.data?.last_name || ''}`.trim(),
      direccion: `${cliente.data?.street || ''} ${cliente.data?.number_ext || ''}`.trim(),
      fecha_creacion: cliente.data?.date_user_start || '',
      manzana: cliente.data?.manzana || '',
      selectable: cliente.data?.selectable ?? true, // Usamos operador nullish coalescing
      reason: cliente.data?.reason || ''
    }));
    
  } catch (err) {
    // Manejar error de cancelación específicamente
    if (axios.isCancel(err)) {
      console.log('Búsqueda cancelada para:', query);
      return []; // Devolver array vacío en lugar de lanzar error
    }
    
    //console.error('Error en búsqueda:', err);
    
    // Relanzar otros tipos de errores
    throw err;
  }
};