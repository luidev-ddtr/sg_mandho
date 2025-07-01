import React, { useState, useEffect } from 'react';
import Customer from './CustomersTableItem';

import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import Image03 from '../../images/user-40-03.jpg';
import Image04 from '../../images/user-40-04.jpg';
import Image05 from '../../images/user-40-05.jpg';
import Image06 from '../../images/user-40-06.jpg';
import Image07 from '../../images/user-40-07.jpg';
import Image08 from '../../images/user-40-08.jpg';
import Image09 from '../../images/user-40-09.jpg';
import Image10 from '../../images/user-40-10.jpg';

function CustomersTable({
  selectedItems
}) {

  const customers = [
    {
      id: '0',
      image: Image01,
      nombre: 'Patricia Lopez',
      email: '13 de Marzo 1990', //Fecha de nacimiento
      location: 'Centro', //tepetate, Cerritos, Yhonda, Garambullo //manzanas
      orders: 'Si', //no //Activo
      lastOrder: '12312', //ID
      spent: '$500', //Pagos
      refunds: 'No', //No
      fav: true
    },
  {
    id: '1',
    image: Image02,
    nombre: 'Carlos Martínez',
    email: '5 de Julio 1985',
    location: 'Tepetate',
    orders: 'Si',
    lastOrder: '14567',
    spent: '$750',
    refunds: 'No',
    fav: false
  },
  {
    id: '2',
    image: Image03,
    nombre: 'Ana Rodríguez',
    email: '22 de Enero 1992',
    location: 'Cerritos',
    orders: 'No',
    lastOrder: '18945',
    spent: '$300',
    refunds: 'Si',
    fav: true
  },
  {
    id: '3',
    image: Image04,
    nombre: 'Jorge Hernández',
    email: '30 de Noviembre 1988',
    location: 'Yhonda',
    orders: 'Si',
    lastOrder: '15623',
    spent: '$1200',
    refunds: 'No',
    fav: false
  },
  {
    id: '4',
    image: Image05,
    nombre: 'María García',
    email: '14 de Febrero 1995',
    location: 'Garambullo',
    orders: 'Si',
    lastOrder: '13456',
    spent: '$950',
    refunds: 'Si',
    fav: true
  },
  {
    id: '5',
    image: Image06,
    nombre: 'Luis Torres',
    email: '8 de Septiembre 1980',
    location: 'Centro',
    orders: 'No',
    lastOrder: '17890',
    spent: '$250',
    refunds: 'No',
    fav: false
  },
  {
    id: '6',
    image: Image07,
    nombre: 'Sofía Ramírez',
    email: '19 de Abril 1993',
    location: 'Tepetate',
    orders: 'Si',
    lastOrder: '16789',
    spent: '$600',
    refunds: 'No',
    fav: true
  },
  {
    id: '7',
    image: Image08,
    nombre: 'Miguel Sánchez',
    email: '3 de Diciembre 1987',
    location: 'Cerritos',
    orders: 'Si',
    lastOrder: '11234',
    spent: '$850',
    refunds: 'Si',
    fav: false
  },
  {
    id: '8',
    image: Image09,
    nombre: 'Elena Castro',
    email: '25 de Mayo 1991',
    location: 'Yhonda',
    orders: 'No',
    lastOrder: '15678',
    spent: '$400',
    refunds: 'No',
    fav: true
  },
  {
    id: '9',
    image: Image10,
    nombre: 'Fernando Ruiz',
    email: '10 de Agosto 1984',
    location: 'Garambullo',
    orders: 'Si',
    lastOrder: '13467',
    spent: '$1100',
    refunds: 'No',
    fav: false
  },
  ];

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
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Todos los Usuarios <span className="text-gray-400 dark:text-gray-500 font-medium">248</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <span className="sr-only">Favourite</span>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Fecha de nacimiento</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Manzana</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Activo</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Total de pago</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Estudia</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
                list.map(customer => {
                  return (
                    <Customer
                      key={customer.id}
                      id={customer.id}
                      image={customer.image}
                      name={customer.nombre}
                      email={customer.email}
                      location={customer.location}
                      orders={customer.orders}
                      lastOrder={customer.lastOrder}
                      spent={customer.spent}
                      refunds={customer.refunds}
                      fav={customer.fav}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(customer.id)}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default CustomersTable;
