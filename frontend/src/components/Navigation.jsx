
import { Link } from 'react-router-dom';
function Navigation() {
    return (
        <ul className="flex flex-col gap-4 w-full"> {/* Usar flex-col para los ítems de la lista vertical */}
            <li>
                <Link
                    to="/Menu" // Usamos 'to' para la ruta
                    className="block w-full text-left bg-gray-800 hover:bg-gray-700 text-blue-300 font-semibold px-4 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Menú Principal
                </Link>
            </li>
            <li>
                <Link
                    to="/Inicio" // Usamos 'to' para la ruta
                    className="block w-full text-left bg-gray-800 hover:bg-gray-700 text-blue-300 font-semibold px-4 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Mensaje de Inicio
                </Link>
            </li>
            <li>
                <Link
                    to="/Signup" // Usamos 'to' para la ruta
                    className="block w-full text-left bg-gray-800 hover:bg-gray-700 text-blue-300 font-semibold px-4 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Registrarse
                </Link>
            </li>
            {/* Agrega más elementos de lista aquí según sea necesario */}
        </ul>
    )
}

export default Navigation;
