import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = 'default' }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);
  const hamburgerButtonRef = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? true : storedSidebarExpanded === "true");
  
  // Estado para controlar el módulo activo y sus opciones
  const [activeModule, setActiveModule] = useState(null);
  const [moduleOptions, setModuleOptions] = useState([]);

  // Definir las opciones para cada módulo
  const moduleOptionsMap = {
    panteon: [
      { path: "/panteon/editar", label: "informes registro" },
      { path: "/panteon/usuarios", label: "Ver Registros" },
      { path: "/panteon/generar", label: "Generar Registro" }
    ], 
    personas: [
      { path: "/personas/usuarios", label: "lista de personas" },
      { path: "/personas/Cuenta", label: "crear cuenta" },
      { path: "/personas/registro", label: "Agregar persona" }
    ],
    agua: [
      { path: "/agua/pagos", label: "Ver pagos" },
      { path: "/agua/generar", label: "Generar recibo" },
      { path: "/agua/reportes", label: "Reportes" }
    ],
    delegacion: [
      { path: "/delegacion/registros", label: "ver registros" },
      { path: "/delegacion/informes", label: "Generar informe" },
      { path: "/delegacion/configuracion", label: "Configuración" }
    ]
  };

  // Efecto para determinar el módulo activo basado en la ruta
  useEffect(() => {
    if (pathname.includes("panteon")) {
      setActiveModule("panteon");
      setModuleOptions(moduleOptionsMap.panteon);
    } else if (pathname.includes("agua")) {
      setActiveModule("agua");
      setModuleOptions(moduleOptionsMap.agua);
    } else if (pathname.includes("delegacion")) {
      setActiveModule("delegacion");
      setModuleOptions(moduleOptionsMap.delegacion);  // Corregido: usar delegacion en lugar de personas
    } else if (pathname.includes("personas")) {
      setActiveModule("personas");
      setModuleOptions(moduleOptionsMap.personas);  // Corregido: usar personas en lugar de delegacion
    }
  }, [pathname]);


  // close on click outside - MODIFICADO
  useEffect(() => {
    const clickHandler = ({ target }) => {
      // No hacer nada si no tenemos las referencias necesarias
      if (!sidebar.current || !trigger.current || !hamburgerButtonRef.current) return;
      
      // No cerrar si:
      // 1. La barra lateral ya está cerrada
      // 2. El clic fue dentro de la barra lateral
      // 3. El clic fue en el trigger (botón de cerrar dentro de la barra)
      // 4. El clic fue en el botón de hamburguesa flotante
      if (!sidebarOpen || 
          sidebar.current.contains(target) || 
          trigger.current.contains(target) ||
          hamburgerButtonRef.current.contains(target)) {
        return;
      }
      
      // Si llegamos aquí, cerrar la barra lateral
      setSidebarOpen(false);
    };
    
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]); // Añadimos sidebarOpen como dependencia

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]); // Añadimos sidebarOpen como dependencia

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      {/* Botón de hamburguesa flotante para móviles */}
      <button
        ref={hamburgerButtonRef} // Asignamos la nueva referencia
        className={`lg:hidden fixed z-50 top-4 left-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition duration-150`}
        onClick={() => {
          // Forzar el estado contrario al actual
          setSidebarOpen(prev => !prev);
        }}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
      >
        <span className="sr-only">Toggle sidebar</span>
        {sidebarOpen ? (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="16" height="2" />
            <rect x="4" y="11" width="16" height="2" />
            <rect x="4" y="17" width="16" height="2" />
          </svg>
        )}
      </button>

      <div className="min-w-fit">
        {/* Sidebar backdrop (mobile only) */}
        <div
          className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        ></div>
        
       {/* Sidebar */}
        <div
          id="sidebar"
          ref={sidebar}
          className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-xs'}`}
        >
          {/* Sidebar header */}
          <div className="flex justify-between mb-10 pr-3 sm:px-2">
            {/* Close button */}
            <button
              ref={trigger}
              className="lg:hidden text-gray-500 hover:text-gray-400"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
            {/* Logo */}
            <NavLink end to="/" className="block">
              <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
              </svg>
            </NavLink>
          </div>
          
          {/* Links */}
          <div className="space-y-8">
            {/* Pages group */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
              </h3>
              <ul className="mt-3">
                {/* Dashboard */}
                <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("dashboard")}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                            pathname === "/" || pathname.includes("dashboard") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick();
                            setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("dashboard") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                                <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                              </svg>                            
                              <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Panel de control
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Informes
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/Analytics"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Analiticas
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Menu inicio
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                
                {/* Módulos */}
                <SidebarLinkGroup activecondition={pathname.includes("panteon") || pathname.includes("agua") || pathname.includes("personas")  || pathname.includes("delegacion")}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                            pathname.includes("panteon") || pathname.includes("personas")  || pathname.includes("agua") || pathname.includes("delegacion") ? "" : "hover:text-gray-900 dark:hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick();
                            setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className={`shrink-0 fill-current ${
                                pathname.includes('panteon') || pathname.includes('agua') || pathname.includes('personas') || pathname.includes('delegacion') ? 
                                'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                              }`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M6 0a6 6 0 0 0-6 6c0 1.077.304 2.062.78 2.912a1 1 0 1 0 1.745-.976A3.945 3.945 0 0 1 2 6a4 4 0 0 1 4-4c.693 0 1.344.194 1.936.525A1 1 0 1 0 8.912.779 5.944 5.944 0 0 0 6 0Z" />
                                <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
                              </svg>
                              <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Modulos
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/modulo/panteon"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                }
                                onClick={() => {
                                  setActiveModule("panteon");
                                  setModuleOptions(moduleOptionsMap.panteon);
                                }}
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Panteon
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/modulo/agua"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                }
                                onClick={() => {
                                  setActiveModule("agua");
                                  setModuleOptions(moduleOptionsMap.agua);
                                }}
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Pago de agua
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/modulo/delegacion"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                }
                                onClick={() => {
                                  setActiveModule("delegacion");
                                  setModuleOptions(moduleOptionsMap.delegacion);
                                }}
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Delegacion
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/modulo/personas"
                                className={({ isActive }) =>
                                  "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                }
                                onClick={() => {
                                  setActiveModule("personas");
                                  setModuleOptions(moduleOptionsMap.personas);
                                }}
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Personnas del pueblo
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                
                {/* Sección dinámica (antes Personas) */}
                {activeModule && (
                  <SidebarLinkGroup activecondition={pathname.includes(activeModule)}>
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                              pathname.includes(activeModule) ? "" : "hover:text-gray-900 dark:hover:text-white"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick();
                              setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <svg className={`shrink-0 fill-current ${
                                  pathname.includes(activeModule) ? 
                                  'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                                }`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                  <path d="M6.753 2.659a1 1 0 0 0-1.506-1.317L2.451 4.537l-.744-.744A1 1 0 1 0 .293 5.207l1.5 1.5a1 1 0 0 0 1.46-.048l3.5-4ZM6.753 10.659a1 1 0 1 0-1.506-1.317l-2.796 3.195-.744-.744a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.46-.049l3.5-4ZM8 4.5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1ZM9 11.5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" />
                                </svg>
                                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {activeModule === 'panteon' && 'Panteón'}
                                  {activeModule === 'agua' && 'Agua'}
                                  {activeModule === 'delegacion' && 'Delegación'}
                                  {activeModule === 'personas' && 'Personas'}
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                              {moduleOptions.map((option, index) => (
                                <li key={index} className="mb-1 last:mb-0">
                                  <NavLink
                                    end
                                    to={option.path}
                                    className={({ isActive }) =>
                                      "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                                    }
                                  >
                                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                      {option.label}
                                    </span>
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                )}

                {/* Authentication (solo en desarrollo) */}
                  <SidebarLinkGroup>
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${open ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick();
                              setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <svg className={`shrink-0 fill-current text-gray-400 dark:text-gray-500`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                  <path d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z" />
                                </svg>
                                <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Authentication
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink end to="/Signup" className="block text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate">
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Sign up
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
              </ul>
            </div>
          </div>
          {/* Expand / collapse button */}
          <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
            <div className="w-12 pl-4 pr-3 py-2">
              <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                <span className="sr-only">Expand / collapse sidebar</span>
                <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;