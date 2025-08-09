import React from "react";
import Sidebar from '../../partials/SideBar';
import Header from "../../partials/Header";
import OnboardingImage from "../../images/onboarding-image.jpg";
import { Link, useParams } from 'react-router-dom';

function Onboarding04() {
  // Obtener el ID de la URL
  const { id } = useParams();


  return (
    <div className="flex h-[100dvh] overflow-hidden bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={false} setSidebarOpen={() => {}} variant="v2" />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={false} setSidebarOpen={() => {}} variant="v3" />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto h-full">
            <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-160px)]">
              {/* Contenido de éxito */}
              <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-md bg-white dark:bg-gray-800/50 rounded-xl shadow-lg dark:shadow-gray-800/10 p-8 md:p-10 lg:p-12">
                  {/* Icono de éxito */}
                  <div className="mb-8 text-center">
                    <svg className="inline-flex w-20 h-20 md:w-24 md:h-24 fill-current" viewBox="0 0 64 64">
                      <circle className="text-green-500/20 dark:text-green-600/30" cx="32" cy="32" r="32" />
                      <path className="text-green-600 dark:text-green-400" d="M37.22 26.375a1 1 0 1 1 1.56 1.25l-8 10a1 1 0 0 1-1.487.082l-4-4a1 1 0 0 1 1.414-1.414l3.21 3.21 7.302-9.128Z" />
                    </svg>
                  </div>
                  
                  {/* Título */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    Usuario insertado correctamente <span className="ml-2">🙌</span>
                  </h1>
                  
                  {/* Mensaje con ID (opcional) */}
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">
                    ID del usuario: <span className="font-mono font-bold">{id}</span>
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    El usuario ha sido registrado exitosamente en el sistema.
                  </p>

                  <div className="flex justify-center">
                    <Link 
                      to="/cuentas/cuenta" 
                      className="
                        px-6 py-3
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-200
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
                        w-full sm:w-auto
                      "
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Crear Cuenta <span className="ml-1">→</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Imagen */}
              <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-8">
                <div className="relative w-full h-full max-h-[70vh] rounded-xl overflow-hidden shadow-lg">
                  <img 
                    className="object-cover object-center w-full h-full" 
                    src={OnboardingImage} 
                    alt="Onboarding"
                    style={{
                      objectPosition: 'center 25%',
                      filter: 'brightness(0.95) contrast(0.95)',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/30 dark:from-gray-900/10 dark:to-gray-900/30"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Onboarding04;
