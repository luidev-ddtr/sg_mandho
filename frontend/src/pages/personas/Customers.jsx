// Customer interfaz principal
// Customers.jsx
import React, { useState } from 'react';
import Sidebar from '../../partials/SideBar';
import Header from '../../partials/Header';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import CustomersTable from '../../partials/customers/CustomersTable';
import PaginationClassic from '../../components/PaginationClassic';
import { Link } from 'react-router-dom';

function Customers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({});

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const handleDateFilterChange = (dateValue) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      ['day', 'month', 'year'].forEach(key => {
        delete newFilters[key];
      });
      
      if (dateValue) {
        newFilters[dateValue] = true;
      }
      return newFilters;
    });
  };

  const handleCategoryFilterChange = (categoryFilters) => {
    setFilters(prev => {
      // Crear nuevo objeto de filtros
      const newFilters = { ...prev };
      
      // Eliminar solo los filtros de categoría existentes
      filterOptions.forEach(option => {
        delete newFilters[option.value];
      });
      
      // Aplicar nuevos filtros de categoría
      Object.keys(categoryFilters).forEach(key => {
        if (categoryFilters[key]) {
          newFilters[key] = true;
        }
      });

      return newFilters;
    });
  };

  const filterOptions = [
    { label: 'Cerritos', value: 'cerritos' },
    { label: 'Centro', value: 'centro' },
    { label: 'Garambullo', value: 'garambullo' },
    { label: 'Yhonda', value: 'yhonda' },
    { label: 'Tepetate', value: 'tepetate' },
    { label: 'Buena vista', value: 'buenavista' },
    { label: 'Defunciones', value: 'enddate' }
  ];

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Personas</h1>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Filtros container */}
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  {/* Date filter */}
                  <div className="relative">
                    <DateSelect onFilterChange={handleDateFilterChange} />
                  </div>
                  
                  {/* Category filter */}
                  <div className="relative">
                    <FilterButton 
                      align="right" 
                      options={filterOptions} 
                      onFilterChange={handleCategoryFilterChange} 
                    />
                  </div>
                </div>

                {/* Add button */}
                <Link
                  to="/personas/registro"
                  className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium rounded-lg shadow transition-all duration-200 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <span className="flex items-center">
                    <span className="mr-2 text-lg">+</span>
                    <span className="text-sm sm:text-base">Agregar Usuario</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <CustomersTable
                selectedItems={handleSelectedItems}
                filters={filters}
              />
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Customers;