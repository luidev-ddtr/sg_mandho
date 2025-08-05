// src/pages/payments/DynamicShowPay.jsx
import React, { useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../partials/SideBar';
import Header from "../../partials/Header";
import DeleteButton from '../../partials/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import PaginationClassic from '../../components/PaginationClassic';

// Componentes dinámicos para tablas
const TABLE_COMPONENT_CONFIG = {
  agua: lazy(() => import('../../components/modules/AguaTable')),
  // panteon: lazy(() => import('../components/tables/PanteonTable')),
  // delegacion: lazy(() => import('../components/tables/DelegacionTable')),
  // feria: lazy(() => import('../components/tables/FeriaTable')),
};

const DynamicDisplayTable = () => {
  const { moduleName } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Formatear el nombre del módulo para mostrar
  const formatModuleName = (name) => {
    if (!name) return '';
    // Convertir primera letra a mayúscula y reemplazar guiones bajos
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
  };

  const formattedModuleName = formatModuleName(moduleName);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const renderTableComponent = () => {
    if (!TABLE_COMPONENT_CONFIG[moduleName]) {
      return (
        <div className="bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg">
          No se encontró componente para el módulo: {moduleName}
        </div>
      );
    }

    const TableComponent = TABLE_COMPONENT_CONFIG[moduleName];
    
    return (
      <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />}>
        <TableComponent selectedItems={handleSelectedItems} />
      </Suspense>
    );
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Mostrando registros de {formattedModuleName}
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />

                {/* Dropdown */}
                <DateSelect />
                
                {/* Filter button */}
                <FilterButton align="right" />

                {/* Add button */}
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Añadir</span>
                </button>
              </div>
            </div>

            {/* Tabla dinámica */}
            {renderTableComponent()}

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DynamicDisplayTable;