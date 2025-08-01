import React, { useState, useEffect } from 'react';
import AccountTableItem from './AccounTableItem';
import { MostrarCuentas } from '../../api/api_account';

function AccountsTableModal({ id_user, onClose }) {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const filters = { 'id_user': id_user };
        const response = await MostrarCuentas(filters);
        
        console.log('Respuesta del backend:', response);
        
        if (response?.success) {
          // Manejo más seguro de los datos
          const accountsData = Array.isArray(response.data?.body) 
            ? response.data.body.map(item => ({
                DIM_AccountId: item.id || item.DIM_AccountId || item.accountId || '',
                customer_id: item.customer || item.customer_id || item.cliente || '',
                DIM_RoleId: item.role || item.DIM_RoleId || item.rol || '',
                DIM_StatusId: item.status || item.DIM_StatusId || item.estado || '',
                startDate: item.startDate || item.fechaInicio || '',
                endDate: item.endDate || item.fechaFin || 's/n'
              }))
            : [];
          
          setAccounts(accountsData);
          
          // Si no hay cuentas pero la respuesta fue exitosa
          if (accountsData.length === 0) {
            console.log('Usuario sin cuentas (respuesta exitosa)');
          }
        } else {
          // Solo establecer error si realmente hay un problema
          if (response?.message && !response.success) {
            throw new Error(response.message);
          }
          setAccounts([]); // Estado vacío válido
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
        // Solo mostramos error si es un error real de conexión/API
        if (!err.message.includes("No se encontraron cuentas")) {
          setError(err.message);
        }
        setAccounts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id_user) {
      fetchAccounts();
    } else {
      setIsLoading(false);
      setAccounts([]);
    }
  }, [id_user]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(selectAll ? [] : accounts.map(account => account.DIM_AccountId));
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck(checked 
      ? [...isCheck, id] 
      : isCheck.filter(item => item !== id)
    );
  };

  // Renderizado condicional simplificado
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-8">Cargando cuentas...</div>;
    }

    if (error) {
      return (
        <>
          <div className="text-center py-8 text-red-500">Error: {error}</div>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded mx-auto block"
          >
            Cerrar
          </button>
        </>
      );
    }

    return (
      <>
        <table className="table-auto w-full dark:text-gray-300">
          <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
            <tr>
              <th className="px-3 py-3 whitespace-nowrap w-10">
                <div className="flex items-center justify-center">
                  <label className="inline-flex">
                    <span className="sr-only">Select all</span>
                    <input 
                      className="form-checkbox" 
                      type="checkbox" 
                      checked={selectAll} 
                      onChange={handleSelectAll} 
                      disabled={accounts.length === 0}
                    />
                  </label>
                </div>
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left min-w-[110px]">
                <div className="font-semibold">ID Cuenta</div>
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left min-w-[110px]">
                <div className="font-semibold">Cliente</div>
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left min-w-[90px]">
                <div className="font-semibold">Rol</div>
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left min-w-[90px]">
                <div className="font-semibold">Estado</div>
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left min-w-[90px]">
                <div className="font-semibold">Fecha Inicio</div>
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left min-w-[90px]">
                <div className="font-semibold">Fecha Fin</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
            {accounts.length > 0 ? (
              accounts.map(account => (
                <AccountTableItem
                  key={account.DIM_AccountId}
                  id={account.DIM_AccountId}
                  customer={account.customer_id}
                  role={account.DIM_RoleId}
                  status={account.DIM_StatusId}
                  startDate={account.startDate}
                  endDate={account.endDate}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(account.DIM_AccountId)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Este usuario no tiene cuentas asociadas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl relative max-w-6xl w-full max-h-[80vh] overflow-y-auto">
        <header className="px-5 py-4 sticky top-0 bg-white dark:bg-gray-800 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Cuentas del Usuario <span className="text-gray-400 dark:text-gray-500 font-medium">
                ({accounts.length})
              </span>
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsTableModal;