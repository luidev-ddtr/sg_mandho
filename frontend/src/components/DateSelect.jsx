import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

/**
 * Componente DateSelect
 * 
 * - El estado `dropdownOpen` controla si el menú desplegable está visible.
 * - El estado `selected` almacena el ID de la opción actualmente seleccionada.
 * 
 * useEffect (click fuera):
 *   Se utiliza para escuchar clics en el documento y cerrar el menú desplegable
 *   si el usuario hace clic fuera del botón o del contenedor del menú.
 * 
 * useEffect (ESC):
 *   Se utiliza para cerrar el menú desplegable cuando el usuario presiona
 *   la tecla Escape (keyCode 27).
 * 
 * handleSelection:
 *   Función síncrona que:
 *     - Busca la opción seleccionada en el array `options` usando su ID.
 *     - Actualiza el estado `selected` con el ID de la opción elegida.
 *     - Cierra el menú desplegable.
 *     - Llama a la función `onFilterChange` (si fue proporcionada) pasando
 *       el valor correspondiente a la opción seleccionada.
 * 
 * options:
 *   Array de objetos con las opciones de selección de fecha, donde cada objeto
 *   contiene:
 *     - id: Identificador numérico único.
 *     - period: Texto visible al usuario.
 *     - value: Valor interno que se envía al callback `onFilterChange`.
 * 
 * UI:
 *   - Botón principal con icono de calendario y texto de la opción seleccionada.
 *   - Icono de flecha que indica desplegable.
 *   - Menú desplegable animado (componente Transition) que lista las opciones.
 *   - Opción seleccionada se marca visualmente con un fondo distinto y un icono de check.
 */

function DateSelect({ onFilterChange }) {
  const options = [
    { id: 0, period: 'Hoy', value: 'day' },
    { id: 1, period: 'Último mes', value: 'month' },
    { id: 2, period: 'Último año', value: 'year' },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(1); // Cambiado a 1 para que coincida con el nuevo array
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Cerrar al hacer clic fuera (mejorado)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !trigger.current) return;
      if (!dropdownOpen) return;
      if (!dropdown.current.contains(target) && !trigger.current.contains(target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

const handleSelection = (id) => {
  const selectedOption = options.find(option => option.id === id);
  if (!selectedOption) return;
  
  setSelected(id);
  setDropdownOpen(false); // Esta línea cierra el dropdown al seleccionar
  if (onFilterChange) {
    onFilterChange(selectedOption.value);
  }
};

return (
  <div className="relative">
    <button
      ref={trigger}
      className="flex items-center justify-between px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 min-w-[120px]"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      aria-expanded={dropdownOpen}
      aria-haspopup="true"
    >
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-gray-700 dark:text-gray-200">
          {options.find(opt => opt.id === selected)?.period || 'Seleccionar'}
        </span>
      </div>
      <svg className="ml-1 w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>

    <Transition
      show={dropdownOpen}
      tag="div"
      className="z-20 absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
      enter="transition ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        ref={dropdown}
        className="py-1"
      >
        {options.map(option => (
          <button
            key={option.id}
            className={`flex items-center w-full px-4 py-2 text-sm text-left ${option.id === selected ? 'bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => handleSelection(option.id)}
          >
            {option.period}
            {option.id === selected && (
              <svg className="ml-auto h-4 w-4 text-indigo-500 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </Transition>
  </div>
);
}

export default DateSelect;