// src/pages/PaymentStatusPage.jsx
import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../../partials/Header";
import Sidebar from '../../partials/SideBar';

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener parámetros de la URL (coinciden con los nombres del onSubmit)
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type'); // 'success' o 'error'
  const text = decodeURIComponent(searchParams.get('text') || '');
  const customerName = decodeURIComponent(searchParams.get('customerName') || '');
  const menuPath = decodeURIComponent(searchParams.get('menuPath') || '/'); // Nueva propiedad

  const isSuccess = type === 'success';

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} variant="v2" />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={false} setSidebarOpen={() => {}} variant="v3" />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {/* Icono */}
              <div className="text-center mb-6">
                {isSuccess ? (
                  <div className="text-6xl text-green-500 mb-4">✓</div>
                ) : (
                  <div className="text-6xl text-red-500 mb-4">✗</div>
                )}
              </div>

              {/* Mensaje principal */}
              <h1 className="text-xl font-bold text-center mb-4 dark:text-white">
                {isSuccess ? 'Pago completado' : 'Error en el pago'}
              </h1>
              
              {/* Mensaje personalizado */}
              <p className="text-center mb-4 dark:text-gray-300">
                {text}
              </p>
              
              {/* Nombre del cliente si existe */}
              {customerName && (
                <p className="text-center mb-6 dark:text-gray-300">
                  Cliente: <span className="font-semibold">{customerName}</span>
                </p>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => navigate(-1)}
                  className={`py-2 px-4 rounded-lg font-medium ${
                    isSuccess 
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isSuccess ? 'Realizar otro pago' : 'Reintentar'}
                </button>
                
                <button
                  onClick={() => navigate(menuPath)}
                  className="py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-medium"
                >
                  Ir al inicio
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentStatus;