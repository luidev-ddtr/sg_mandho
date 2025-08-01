import React from 'react';
import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import ActionMenu from '../ActionMenu';


function AccountTableItem(props) {
  // Mapeo de estados con colores de fondo y texto
  const statusStyles = {
    'activo': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'inactivo': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'desactivado': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* Checkbox */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input 
              id={props.id} 
              className="form-checkbox h-4 w-4" 
              type="checkbox" 
              onChange={props.handleClick} 
              checked={props.isChecked} 
            />
          </label>
        </div>
      </td>
      
      {/* ID de Cuenta */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-600 dark:text-sky-400 text-sm">
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
          <div className="text-left text-sm">{props.customer}</div>
        </div>
      </td>
      
      {/* Rol - Versión simplificada */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-sm">
          {props.role}
        </div>
      </td>
      
      {/* Estado con fondo de color */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`text-center text-sm font-medium px-3 py-1 rounded-full ${statusStyles[props.status] || statusStyles['default']}`}>
          {props.status}
        </div>
      </td>
      
      {/* Fechas */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center text-sm">{props.startDate}</div>
      </td>
      
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center text-sm">{props.endDate}</div>
      </td>
    </tr>
  );
}

export default AccountTableItem;