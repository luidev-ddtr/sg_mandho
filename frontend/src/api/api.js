import axios from "axios";

export const getAlldata = () => {
    return axios.get('http://127.0.0.1:5000/api/read/', {
        //withCredentials: true,  // Solo si usas cookies/sesión
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}