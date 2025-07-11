// src/components/BarraBusquedaAutomatica.js
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import { buscarClientes, formatDate } from '../../api/api_account';

const BarraBusquedaAutomatica = ({ 
  register, 
  errors, 
  setValue, 
  selectedClient,
  setSelectedClient
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 300); // 300ms de debounce

  // Efecto para búsqueda automática
  useEffect(() => {
    const search = async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
        setSearchResults([]);
        setHasSearched(false);
        return;
      }

      setIsSearching(true);
      setHasSearched(true);
      
      try {
        const results = await buscarClientes(debouncedSearchTerm);
        setSearchResults(results);
      } catch (err) {
        console.error('Error en búsqueda:', err);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [debouncedSearchTerm]);

  // Seleccionar cliente
  const selectClient = (client) => {
    if (!client.selectable) {
      alert(client.reason || 'Este usuario no está disponible');
      return;
    }
    
    setSelectedClient(client);
    setValue('cliente', client.nombre_completo);
    setSearchResults([]);
    setSearchQuery('');
    setHasSearched(false);
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
        Cliente <span className="text-red-500">*</span>
      </label>
      
      {selectedClient ? (
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {selectedClient.nombre_completo}
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                <p>Dirección: {selectedClient.direccion}</p>
                <p>Manzana: {selectedClient.manzana}</p>
                <p>Fecha de registro: {formatDate(selectedClient.fecha_creacion)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedClient(null);
                setValue('cliente', '');
              }}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Cambiar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={`mb-4 p-2 rounded-lg shadow-md border-2 border-blue-500 bg-white dark:bg-gray-700 ${
            hasSearched ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}>
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2 focus:outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                placeholder="Buscar por nombre, dirección o manzana..."
                disabled={isSearching}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setHasSearched(false);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {isSearching && (
            <div className="p-4 text-center text-gray-500 bg-white dark:bg-gray-700 rounded-lg shadow mb-2">
              Buscando...
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mb-4 border rounded-lg overflow-hidden">
              <div className="overflow-y-auto max-h-60 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dirección</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Manzana</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha Registro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {searchResults.map(persona => (
                      <tr 
                        key={persona.id}
                        onClick={() => selectClient(persona)}
                        className={`cursor-pointer transition-all duration-200 ${
                          persona.selectable 
                            ? 'hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-md' 
                            : 'opacity-60'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="text-gray-800 dark:text-gray-200 font-medium">
                            {persona.nombre_completo}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {persona.id}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {persona.direccion}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {persona.manzana}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {formatDate(persona.fecha_creacion)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {hasSearched && searchResults.length === 0 && !isSearching && (
            <div className="p-4 text-center text-gray-500 bg-white dark:bg-gray-700 rounded-lg shadow mb-2">
              No se encontraron resultados para "{searchQuery}"
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BarraBusquedaAutomatica;