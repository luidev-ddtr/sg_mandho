import axios from "axios";


const api = axios.create({   
        baseURL: 'http://127.0.0.1:5000/api/auth/'
    });

/**
 * Esta función obtiene los datos del usuario desde el backend.
 * @param {string} username - El nombre de usuario del cual se desean obtener los datos.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos del usuario.
 */
export const ObtenerUsuario = async (data_user) => {
    console.log(data_user);
    console.log("Obteniendo datos del usuario...");
    try {
        const response = await api.get(`read_user/${data_user}`);
        return { data: response.data.body }; // Asigna los datos = response.data;
    } catch (error) {
        console.log(error);
    }
}