// src/components/accounts/GetAccount.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { formatDate } from '../../api/api_account';
import { buscarClientes } from '../../api/api_busqueda_persona';
import { MostrarCuentas } from '../../api/api_account';

const schema = yup.object().shape({
  cliente: yup
    .object()
    .required('Debe seleccionar un cliente'),
  activeAccount: yup
    .object()
    .nullable()
    .required('El cliente no tiene cuentas asociadas')
    .test(
      'cuenta-activa-validacion',
      'La cuenta no está activa',
      function (value) {
        if (!value) return false;
        const status = String(value?.DIM_StatusId || value?.status || '')
          .trim()
          .toLowerCase();
        return status === 'activo';
      }
    )
});

const BarraBusquedaConCuentas = ({ onValidityChange, onAccountData}) => {
  const { 
    setValue, 
    watch, 
    formState: { isValid, errors } 
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
      defaultValues: {
      cliente: null,
      activeAccount: null,
      loadingAccount: false
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const formValues = watch();

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    
    abortControllerRef.current = new AbortController();
    
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value, abortControllerRef.current.signal);
    }, 500);
  };

  const performSearch = async (query, signal) => {
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const results = await buscarClientes(query, signal);
      if (!signal.aborted) setSearchResults(results);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error en búsqueda:', err);
        setSearchResults([]);
      }
    } finally {
      if (!signal.aborted) setIsSearching(false);
    }
  };

  const loadActiveAccount = async (personaId) => {
    setValue('loadingAccount', true, { shouldValidate: true });
    
    try {
      const filters = { 'id_user': personaId, 'status': 'Activo' };
      const response = await MostrarCuentas(filters);
      
      let account = null;
      if (response?.success && Array.isArray(response.data?.body) && response.data.body.length > 0) {
        account = response.data.body[0];
        
        account = {
          ...account,
          DIM_AccountId: account.DIM_AccountId || account.id_account || '',
          DIM_customerId: account.DIM_CustomerId || account.customer_id || '',
          DIM_RoleId: account.DIM_RoleId || account.role_id || '',
          DIM_StatusId: account.DIM_StatusId || account.status || ''
        };
          if (onAccountData) { 
          onAccountData({
            accountId: account.DIM_AccountId,
            customerId: personaId,
            status: account.DIM_StatusId,
            customerName: account.DIM_CustomerId
          })
        }
      };
      
      console.log('Se cargo una cuenta activa');
      setValue('activeAccount', account, { shouldValidate: true });
      
    } catch (err) {
      console.error("Error cargando cuenta activa:", err);
      setValue('activeAccount', null, { shouldValidate: true });
    } finally {
      setValue('loadingAccount', false, { shouldValidate: true });
    }
  };

  const selectClient = async (client) => {
    if (!client.selectable) {
      alert(client.reason || 'Este usuario no está disponible');
      return;
    }

    setValue('cliente', client, { shouldValidate: true });
    setSearchResults([]);
    setSearchQuery('');
    setHasSearched(false);

    await loadActiveAccount(client.id);
  };

return (
    <div className="mb-6">
      {formValues.cliente ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {formValues.cliente.nombre_completo}
                </p>
                <div className="text-base space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Manzana:</span> {formValues.cliente.manzana}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Dirección:</span> {formValues.cliente.direccion}.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Fecha de registro:</span> {formatDate(formValues.cliente.fecha_creacion)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValue('cliente', null, { shouldValidate: true });
                  setValue('activeAccount', null, { shouldValidate: true });
                }}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Cambiar
              </button>
            </div>
          </div>

          {formValues.loadingAccount ? (
            <div className="p-4 text-center text-gray-500 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando cuenta activa...
              </div>
            </div>
          ) : formValues.activeAccount ? (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Cuenta activa:
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-base">
                  <thead className="text-left bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 w-1/3">Cliente</th>
                      <th className="py-2 px-4 w-1/3">Rol</th>
                      <th className="py-2 px-4 w-1/3">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4">{formValues.activeAccount.DIM_customerId}</td>
                      <td className="py-3 px-4">{formValues.activeAccount.DIM_RoleId}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {formValues.activeAccount.DIM_StatusId}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-3 px-4 text-gray-500 bg-white dark:bg-gray-700 rounded-lg shadow">
              No se encontraron cuentas activas para este cliente
            </div>
          )}
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
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 p-2 focus:outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                placeholder="Buscar por nombre, dirección..."
                autoComplete="off"
              />
              {isSearching && (
                <div className="p-2">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              {!isSearching && searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setHasSearched(false);
                    inputRef.current?.focus();
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
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Buscando...
              </div>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mb-4 border rounded-lg overflow-hidden">
              <div className="overflow-y-auto max-h-[60vh] bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dirección</th>
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
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {persona.direccion}
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

      {errors.cliente && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errors.cliente.message}
        </div>
      )}
    </div>
  );
};

// Componente validado y funcionando correctamente - Versión final aprobada
export default BarraBusquedaConCuentas;