// src/components/LoadingSpinner.jsx
import React from 'react';

function LoadingSpinner({
  fullScreen = false
}) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'h-full'}`}>
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-300"></div>
        
        {/* Spinner animado */}
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-500 border-t-transparent"></div>
        
        {/* Texto opcional */}
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;