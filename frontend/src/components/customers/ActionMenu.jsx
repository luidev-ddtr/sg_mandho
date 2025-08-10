//codigo del action menu
import React, { useState, useRef } from 'react';
import AccountsTableModal from '../accounts/AccounsTable';
import EditCustomerModal from './CustomerEdit';
import DesactivateModal from './DesactivateModal';

function ActionMenu({  onUpdate, onDelete, id_user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [desactivateUserOpen, setDesactivateUserOpen] = useState(false);
  const [accountsModalOpen, setAccountsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditModalOpen(true);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón del menú */}
      <button
        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="2" />
          <circle cx="10" cy="16" r="2" />
          <circle cx="22" cy="16" r="2" />
        </svg>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
             e.stopPropagation();
            setEditModalOpen(true);
            setIsOpen(false);
            }}
          >
            Editar
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setDesactivateUserOpen(true);
              setIsOpen(false);
            }}
          >
            Marcar como Fallecido
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setAccountsModalOpen(true);
              setIsOpen(false);
            }}
          >
            Ver Cuentas
          </button>
        </div>
      )}

      {/* Modal de Edición */}
      {editModalOpen && (
        <EditCustomerModal
          id_user={id_user}
          onClose={() => setEditModalOpen(false)}
          onUpdate={onUpdate} // Pasamos la prop al modal de edición
        />
      )}

      {desactivateUserOpen && (
        <DesactivateModal 
        id_user={id_user} 
        onClose={() => setDesactivateUserOpen(false)} 
        // onUpdate={recargarUsuarios} 
      />
      )}

      {/* Modal de Ver Cuentas */}
      {accountsModalOpen && (
        <AccountsTableModal
          id_user={id_user}
          onClose={() => setAccountsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ActionMenu;