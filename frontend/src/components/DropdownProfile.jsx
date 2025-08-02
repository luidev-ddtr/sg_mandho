// DropdownProfile.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Transition from '../utils/Transition';
import UserAvatar from '../images/user-avatar-32.png';
import { useAuth } from '../utils/AuthContext';

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  // Manejamos el evento click fuera del menú para cerrarlo
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    dispatch({ type: "CLEAR_USER" });             // Limpia estado global
    localStorage.removeItem("usuario");           // Elimina del localStorage
    navigate("/Signup");                          // Redirige al login
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-10 h-10 rounded-full" src={UserAvatar} width="40" height="40" alt="User" />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-base font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
            {state.usuario?.UserFullName || "Usuario"}
          </span>
          <svg className="w-4 h-4 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-2 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-1 pb-2 px-4 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-medium text-lg text-gray-800 dark:text-gray-100">
              {state.usuario?.UserFullName || "Usuario"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              {state.usuario?.StatusName || "Rol desconocido"}
            </div>
          </div>
          <ul>
            <li>
              <button
                className="font-medium text-base text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-2 px-4 w-full text-left"
                onClick={cerrarSesion}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
