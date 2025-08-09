import React from 'react';
import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import ActionMenu from '../../components/customers/ActionMenu';
function CustomersTableItem(props) {
    const imageMap = {
    'Image01': Image01,
    'Image02': Image02,
    // Añade más imágenes según necesites
  };

  // Obtiene la imagen correcta o una por defecto si no existe
  const userImage = imageMap[props.image] || Image01;

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center relative">
          <button>
            <svg
              className={`shrink-0 fill-current ${props.fav ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img className="rounded-full" src={userImage} width="40" height="40" alt={props.name} />
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.last_name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.birth_date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium text-sky-600">{props.manzana}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-green-600">{props.address}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap visible">
        <div className="text-center">{props.date_of_start}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.date_of_end}</div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
        <ActionMenu 
          id_user={props.id}
          onUpdate={props.onEditSuccess} // Pasamos la prop hacia abajo
        />
      </td>
    </tr>
  );
}

export default CustomersTableItem;
