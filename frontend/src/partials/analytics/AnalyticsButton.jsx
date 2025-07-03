import React from 'react';
import { Link } from 'react-router-dom';

function AnalyticsButton() {
  return (
    <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Módulos del Sistema</h2>
      </header>
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Botón Módulo Panteón */}
        <Link 
          to="/modulo-panteon" 
          className="
            flex-1 px-4 py-3 md:px-6 md:py-4
            bg-gradient-to-r from-gray-800 to-gray-900
            dark:from-gray-100 dark:to-gray-200
            text-white dark:text-gray-900
            font-medium rounded-lg
            shadow-lg
            transition-all duration-300
            transform hover:scale-[1.02]
            hover:shadow-xl
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
            relative overflow-hidden
            group
            text-center
          "
        >
          <span className="relative z-10 flex items-center justify-center">
            Módulo Panteón <span className="ml-1">-&gt;</span>
          </span>
          <span className="
            absolute inset-0
            bg-gradient-to-r from-violet-600 to-blue-500
            dark:from-violet-400 dark:to-blue-300
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
          "></span>
        </Link>

        {/* Botón Módulo Pago Agua */}
        <Link 
          to="/modulo-pago-agua" 
          className="
            flex-1 px-4 py-3 md:px-6 md:py-4
            bg-gradient-to-r from-gray-800 to-gray-900
            dark:from-gray-100 dark:to-gray-200
            text-white dark:text-gray-900
            font-medium rounded-lg
            shadow-lg
            transition-all duration-300
            transform hover:scale-[1.02]
            hover:shadow-xl
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
            relative overflow-hidden
            group
            text-center
          "
        >
          <span className="relative z-10 flex items-center justify-center">
            Módulo Pago Agua <span className="ml-1">-&gt;</span>
          </span>
          <span className="
            absolute inset-0
            bg-gradient-to-r from-violet-600 to-blue-500
            dark:from-violet-400 dark:to-blue-300
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
          "></span>
        </Link>

        {/* Botón Módulo Delegación */}
        <Link 
          to="/modulo-delegacion" 
          className="
            flex-1 px-4 py-3 md:px-6 md:py-4
            bg-gradient-to-r from-gray-800 to-gray-900
            dark:from-gray-100 dark:to-gray-200
            text-white dark:text-gray-900
            font-medium rounded-lg
            shadow-lg
            transition-all duration-300
            transform hover:scale-[1.02]
            hover:shadow-xl
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
            relative overflow-hidden
            group
            text-center
          "
        >
          <span className="relative z-10 flex items-center justify-center">
            Módulo Delegación <span className="ml-1">-&gt;</span>
          </span>
          <span className="
            absolute inset-0
            bg-gradient-to-r from-violet-600 to-blue-500
            dark:from-violet-400 dark:to-blue-300
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
          "></span>
        </Link>
      </div>
    </div>
  );
}

export default AnalyticsButton;