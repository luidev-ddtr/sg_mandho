import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

/**
 * Componente DropdownFilter
 * 
 * - Estado:
 *   - `dropdownOpen`: Controla si el menú desplegable de filtros está visible.
 *   - `selectedOptions`: Objeto que almacena las opciones seleccionadas, donde
 *      la clave es el valor (`value`) de la opción y el valor booleano indica
 *      si está seleccionada.
 * 
 * useEffect (click fuera):
 *   Se utiliza para cerrar el menú desplegable cuando el usuario hace clic fuera
 *   del área del componente (ni en el botón trigger ni dentro del dropdown).
 * 
 * useEffect (ESC):
 *   Se utiliza para cerrar el menú desplegable cuando el usuario presiona la tecla
 *   Escape (keyCode 27).
 * 
 * handleOptionChange:
 *   Función síncrona que alterna el estado de selección de una opción específica.
 *   - Si la opción estaba seleccionada, la desmarca.
 *   - Si no estaba seleccionada, la marca como true.
 * 
 * handleClear:
 *   Limpia todas las selecciones:
 *     - Vacía el estado `selectedOptions`.
 *     - Llama a `onFilterChange` con un objeto vacío para notificar al padre.
 *     - Cierra el menú desplegable.
 * 
 * handleApply:
 *   Aplica los filtros seleccionados:
 *     - Llama a `onFilterChange` pasando el estado `selectedOptions`.
 *     - Cierra el menú desplegable.
 * 
 * options:
 *   Array de objetos que definen las opciones del filtro, con:
 *     - label: Texto que se muestra al usuario.
 *     - value: Identificador único que se usa para el manejo interno de selección.
 * 
 * UI:
 *   - Botón principal (trigger) con icono de filtro y flecha que rota según
 *     el estado `dropdownOpen`.
 *   - Componente `Transition` para animar la apertura/cierre del menú.
 *   - Lista de opciones con checkboxes para seleccionar múltiples filtros.
 *   - Botones en el pie:
 *       - "Limpiar": elimina todas las selecciones.
 *       - "Aplicar": confirma y envía las selecciones al callback padre.
 */

function DropdownFilter({ align, options, onFilterChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Cerrar al presionar ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleOptionChange = (value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
  };

  const handleClear = () => {
    setSelectedOptions({});
    onFilterChange({});
    setDropdownOpen(false);
  };

  const handleApply = () => {
    onFilterChange(selectedOptions);
    setDropdownOpen(false);
  };

return (
  <div className="relative inline-flex">
    <button
      ref={trigger}
      className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all duration-200 hover:shadow-md"
      aria-haspopup="true"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      aria-expanded={dropdownOpen}
    >
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      <span>Aplicar filtros</span>
      <svg className={`w-4 h-4 ml-1 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>

    <Transition
      show={dropdownOpen}
      tag="div"
      className={`origin-top-right z-20 absolute top-full left-0 right-auto min-w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden mt-1 ${
        align === 'right' ? 'md:left-auto md:right-0' : 'md:left-0 md:right-auto'
      }`}
      enter="transition ease-out duration-200"
      enterStart="opacity-0 -translate-y-2"
      enterEnd="opacity-100 translate-y-0"
      leave="transition ease-out duration-200"
      leaveStart="opacity-100"
      leaveEnd="opacity-0"
    >
      <div ref={dropdown} className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Filtrar por:</h3>
        </div>
        <div className="py-2">
          <ul className="space-y-1">
            {options.map((option, index) => (
              <li key={index}>
                <label className="flex items-center px-4 py-2 space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 dark:text-indigo-500 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600"
                    checked={!!selectedOptions[option.value]}
                    onChange={() => handleOptionChange(option.value)}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/30 flex justify-between space-x-3">
          <button 
            className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
            onClick={handleClear}
          >
            Limpiar
          </button>
          <button
            className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded-md shadow-sm transition-colors duration-150"
            onClick={handleApply}
          >
            Aplicar 
          </button>
        </div>
      </div>
    </Transition>
  </div>
);
}

export default DropdownFilter;