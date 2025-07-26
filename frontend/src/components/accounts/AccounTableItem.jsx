import React from 'react';
import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import ActionMenu from '../ActionMenu';

function AccountTableItem(props) {
  const statusColor = {
    'Activo': 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400',
    'Inactivo': 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400',
    'default': 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
  };

  const roleColor = {
    'Administrador': 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400',
    'Usuario': 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-400',
    'default': 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
  };

  return (
    <tr>
      {/* Checkbox */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input 
              id={props.id} 
              className="form-checkbox" 
              type="checkbox" 
              onChange={props.handleClick} 
              checked={props.isChecked} 
            />
          </label>
        </div>
      </td>
      
      {/* ID de Cuenta */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-600 dark:text-sky-400">
          {props.id.substring(0, 8)}...
        </div>
      </td>
      
      {/* Cliente */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img 
              className="rounded-full" 
              src={Image01} 
              width="40" 
              height="40" 
              alt={props.customer} 
            />
          </div>
          <div className="text-left">{props.customer}</div>
        </div>
      </td>
      
      {/* Rol */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`text-left text-xs font-medium px-2 py-1 rounded-full ${
          roleColor[props.role] || roleColor['default']
        }`}>
          {props.role}
        </div>
      </td>
      
      {/* Estado */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`text-left text-xs font-medium px-2 py-1 rounded-full ${
          statusColor[props.status] || statusColor['default']
        }`}>
          {props.status}
        </div>
      </td>
      
      {/* Fecha Inicio */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.startDate}</div>
      </td>
      
      {/* Fecha Fin */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.endDate}</div>
      </td>
      
      {/* Acciones */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <ActionMenu />
      </td>
    </tr>
  );
}

export default AccountTableItem;