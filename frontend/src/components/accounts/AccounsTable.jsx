import React, { useState, useEffect } from 'react';
import Cuenta from './AccounTableItem';
import { MostrarCuentas } from '../../api/api_account';

function AccountsTable({ selectedItems }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [accounts, setAccounts] = useState([]); // Cambiado de list a accounts
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(accounts.map(account => account.DIM_AccountId)); // Usar DIM_AccountId como identificador
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const filters = { 'id_user': "" }; // Para obtener todas las cuentas
        
        const response = await MostrarCuentas(filters);
        
        // Asegurarse de que estamos accediendo a los datos correctamente
        if (response.success && Array.isArray(response.data)) {
          setAccounts(response.data);
        } else {
          throw new Error("Formato de datos inesperado");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching accounts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAccounts();
  }, []);

  if (isLoading) return <div>Cargando cuentas...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Total de Cuentas <span className="text-gray-400 dark:text-gray-500 font-medium">
            {accounts.length}
          </span>
        </h2>
      </header>
      <div>
        <div className="overflow-x-auto">
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
                <th className="px-2 py-3 whitespace-nowrap w-20 text-center">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {accounts.map(account => (
                <Cuenta
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountsTable;