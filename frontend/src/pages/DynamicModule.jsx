import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import Sidebar from '../partials/SideBar';
import Header from "../partials/Header";

/**
 * DynamicModule is a React component that dynamically loads and displays
 * a module based on the moduleName obtained from the URL parameters.
 * It fetches module data from a JSON file, manages loading states, and 
 * renders various sections including a header, features, and navigation
 * options. If the module data is unavailable or fails to load, it 
 * displays appropriate messages. This component also includes a sidebar 
 * and a header that can be toggled open or closed, and provides a mobile 
 * menu for navigation.
 */

const DynamicModule = () => {
  const { moduleName } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadModuleData = async () => {
      try {
        const data = await import(`../components/modules/${moduleName}.json`);
        setModuleData(data.default);
      } catch (error) {
        console.error(`Error cargando el módulo ${moduleName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadModuleData();
  }, [moduleName]);

  if (loading) {
    return (
      <div className="flex h-[100dvh] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <p className="mt-6 text-gray-600 dark:text-gray-300">Cargando módulo...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!moduleData) {
    return (
      <div className="flex h-[100dvh] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-8 text-center text-red-500 min-h-[60vh] flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">Módulo no encontrado</h3>
                <p className="text-gray-500 dark:text-gray-400">El módulo "{moduleName}" no existe o no pudo ser cargado</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          {/* Profile background */}
          <div className="h-56 bg-gray-200 dark:bg-gray-900">
            <img 
              src={moduleData.image} 
              className="object-cover h-full w-full" 
              alt={`Fondo del módulo ${moduleData.title}`}
            />
          </div>

          {/* Header */}
          <header className="text-center bg-white/30 dark:bg-gray-800/30 pb-6 border-b border-gray-200 dark:border-gray-700/60">
            <div className="px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl mx-auto">
                {/* Avatar */}
                <div className="-mt-12 mb-2">
                  <div className="inline-flex -ml-1 -mt-1 sm:mb-0">
                    <div className="rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 w-24 h-24 flex items-center justify-center text-4xl">
                      {moduleData.icon}
                    </div>
                  </div>
                </div>

                {/* Module name and info */}
                <div className="mb-4">
                  <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-2">{moduleData.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{moduleData.description}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="max-w-3xl mx-auto">
              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden mb-6 w-full flex items-center justify-between px-5 py-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <span className="font-medium text-gray-800 dark:text-gray-100">Menú del módulo</span>
                <svg 
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Mobile menu */}
              {mobileMenuOpen && (
                <div className="lg:hidden mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-xs p-5 border border-gray-200 dark:border-gray-700">
                  <nav>
                    <ul className="space-y-2">
                      {moduleData.sidebarSections.map((section, index) => (
                        <li key={index}>
                          <NavLink
                            to={section.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-3 rounded-lg transition-all ${
                                isActive 
                                  ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`
                            }
                          >
                            <div className="flex items-center">
                              <span className="mr-3">{section.icon}</span>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-100">
                                  {section.label}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {section.shortDescription}
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Welcome Section */}
              <section className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-5">
                  <h2 className="text-xl text-gray-800 dark:text-gray-100 font-bold mb-3">
                    {moduleData.mainContent.welcomeMessage}
                  </h2>
                  {moduleData.mainContent.subtitle && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{moduleData.mainContent.subtitle}</p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300">
                    {moduleData.mainContent.instructions}
                  </p>
                </div>
              </section>

              {/* Aquí irán las estadísticas (Estadísticas que agregaste) */}
              <div className="mb-8"></div>

              {/* Features Section */}
              <section className="mb-8">
                <h2 className="text-xl text-gray-800 dark:text-gray-100 font-bold mb-4 text-center">
                  Características Principales
                </h2>
                <div className="space-y-3">
                  {moduleData.mainContent.features.map((feature, i) => (
                    <div 
                      key={i}
                      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start">
                        <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-lg mr-3">
                          <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Navigation Cards */}
              <section className="mb-8">
                <h2 className="text-xl text-gray-800 dark:text-gray-100 font-bold mb-6 text-center">
                  Acciones Disponibles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleData.sidebarSections.map((section, index) => (
                    <NavLink
                      key={index}
                      to={section.path}
                      className={({ isActive }) => `
                        flex-1 px-4 py-3 md:px-6 md:py-4
                        ${isActive ? 
                          'bg-gradient-to-r from-violet-600 to-blue-500 dark:from-violet-500 dark:to-blue-400 text-white' : 
                          'bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900'
                        }
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
                        border border-gray-700 dark:border-gray-300
                      `}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="mr-2">{section.icon}</span>
                        {section.label} 
                        <svg 
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </NavLink>
                  ))}
                </div>
              </section>

              {/* Help Section */}
              {moduleData.helpSection && (
                <section className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-xs p-5 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">¿Necesitas ayuda?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${moduleData.helpSection.contactEmail}`} className="text-violet-600 dark:text-violet-400 hover:underline">
                        {moduleData.helpSection.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <NavLink to={moduleData.helpSection.guideLink} className="text-violet-600 dark:text-violet-400 hover:underline">
                        Documentación del módulo
                      </NavLink>
                    </div>
                  </div>
                </section>
              )}

              {/* Outlet Section */}
              <section className="bg-white dark:bg-gray-800 rounded-xl shadow-xs p-5">
                <Outlet />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DynamicModule;