import React, { useState, useEffect } from 'react';
import Customer from './CustomersTableItem';
import { MostrarUsuarios1 } from '../../api/api_user';

function CustomersTable({
  selectedItems
}) {

  const customers = () => {
    return MostrarUsuarios1();
  };

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(customers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
<div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl relative">
  <header className="px-5 py-4">
    <h2 className="font-semibold text-gray-800 dark:text-gray-100">
      Total de Usuarios <span className="text-gray-400 dark:text-gray-500 font-medium">
        {customers.length} {/* Elimina los paréntesis */}
      </span>
    </h2>
  </header>
  <div>

<div className="overflow-x-auto">
  <table className="table-auto w-full dark:text-gray-300">
    {/* Table header */}
    <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
      <tr>
        {/* Columna Checkbox */}
        <th className="px-3 py-3 whitespace-nowrap w-10">
          <div className="flex items-center justify-center">
            <label className="inline-flex">
              <span className="sr-only">Select all</span>
              <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </label>
          </div>
        </th>
        
        {/* Columna Imagen (vacía pero necesaria para alineación) */}
        <th className="px-1 py-3 whitespace-nowrap w-12">
          <span className="sr-only">Imagen</span>
        </th>
        
        {/* Columna Nombre (alineada con el contenido real) */}
        <th className="px-4 py-3 whitespace-nowrap text-left min-w-[50px]">
          <div className="font-semibold"></div>
        </th>
        
        {/* Resto de columnas */}
        <th className="px-4 py-3 whitespace-nowrap text-left min-w-[110px]">
          <div className="font-semibold">Nombre</div>
        </th>
        <th className="px-4 py-3 whitespace-nowrap text-left min-w-[110px]">
          <div className="font-semibold">Apellidos</div>
        </th>
        <th className="px-4 py-3 whitespace-nowrap text-left min-w-[90px]">
          <div className="font-semibold">Fecha de nacimiento</div>
        </th>
        <th className="px-4 py-3 whitespace-nowrap text-center min-w-[70px]">
          <div className="font-semibold">Manzana</div>
        </th>
        <th className="px-4 py-3 whitespace-nowrap text-left min-w-[90px]">
          <div className="font-semibold">Dirección</div>
        </th>
        <th className="px-4 py-3 whitespace-nowrap text-left min-w-[90px]">
          <div className="font-semibold">Fecha de Alta</div>
        </th>
        <th className="px-4 py-3 whitespace-nowrap text-left min-w-[150px]">
          <div className="font-semibold">Fecha Defunción</div>
        </th>
        <th className="px-2 py-3 whitespace-nowrap w-20 text-center">
          <span className="sr-only">Acciones</span>
        </th>
      </tr>
    </thead>
    
    {/* Table body */}
    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
      {list.map(customer => (
        <Customer
          key={customer.id}
          id={customer.id}
          image={customer.image}
          name={customer.first_name + ' ' + customer.second_name}
          last_name={customer.last_name + ' ' + customer.second_last_name}
          birth_date={customer.date_of_birth}
          manzana={customer.user_manzana}
          address={customer.user_street + ' ' + customer.user_number_ext}
          date_of_start={customer.date_user_start}
          date_of_end={customer.date_user_end}
          handleClick={handleClick}
          isChecked={isCheck.includes(customer.id)}
        />
      ))}
    </tbody>
  </table>
</div>


      </div>
    </div>
  );
}

export default CustomersTable;
