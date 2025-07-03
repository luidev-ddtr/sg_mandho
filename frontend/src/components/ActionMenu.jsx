import React, { useState, useRef, useEffect } from 'react';
import ModalBlank from './ModalBlank'; // Asegúrate de importar tu componente Modal

function ActionMenu({ userId, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              setDeleteModalOpen(true);
              setIsOpen(false);
            }}
          >
            Eliminar
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              // Aquí puedes agregar otra acción
            }}
          >
            Otra acción
          </button>
        </div>
      )}

      {/* Modal de Editar */}
      <ModalBlank id={`edit-modal-${userId}`} modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
        <div className="p-5 flex space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-700">
            <svg className="shrink-0 fill-current text-blue-500" width="16" height="16" viewBox="0 0 16 16">
              <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="mb-2">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">Editar Usuario #{userId}</div>
            </div>
            <div className="text-sm mb-10">
              <p>Formulario de edición iría aquí...</p>
            </div>
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModalOpen(false);
                }}
              >
                Cancelar
              </button>
              <button 
                className="btn-sm bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                  onEdit(userId);
                  setEditModalOpen(false);
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>

      {/* Modal de Eliminar */}
      <ModalBlank id={`delete-modal-${userId}`} modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
        <div className="p-5 flex space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 dark:bg-gray-700">
            <svg className="shrink-0 fill-current text-red-500" width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zM5 7h6v2H5z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="mb-2">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">Eliminar Usuario #{userId}</div>
            </div>
            <div className="text-sm mb-10">
              <p>¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.</p>
            </div>
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteModalOpen(false);
                }}
              >
                Cancelar
              </button>
              <button 
                className="btn-sm bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  onDelete(userId);
                  setDeleteModalOpen(false);
                }}
              >
                Confirmar Eliminación
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
    </div>
  );
}

export default ActionMenu;