import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/SideBar';
import Header from "../partials/Header";
import BarraBusquedaAutomatica from '../components/customers/BarraBusqueda';
import { crearCuenta } from '../api/api_account';

// Esquema de validación con Yup
const accountSchema = yup.object().shape({
  estadoPersona: yup.string()
    .required('Debe seleccionar un estado para la persona')
    .oneOf([
      'Estudiante', 'Inmigrante', 'Pequeño propietario', 
      'Vecino', 'Ranchero', 'Invalido'
    ], 'Estado no válido'),
  fechaCreacion: yup.string().required()
});

function Cart() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Configuración de react-hook-form
  const { 
    register, 
    handleSubmit, 
    setValue,
    reset,
    watch,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      fechaCreacion: new Date().toISOString()
    }
  });

  // Seleccionar cliente de los resultados
  const selectClient = (client) => {
    setSelectedClient(client);
    setValue('cliente', client.nombre);
  };

  // Manejar envío del formulario
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await crearCuenta(data);
      alert(response.message);
      reset();
      setSelectedClient(null);
    } catch (err) {
      alert('Error al crear la cuenta');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Creación de Nueva Cuenta
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Sección Cliente con Buscador */}
                  {/* Sección Cliente con Buscador Automático */}
                  <BarraBusquedaAutomatica 
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    selectedClient={selectedClient}
                    setSelectedClient={setSelectedClient}
                  />

                {/* Estado de la persona */}
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Estado de la persona <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('estadoPersona')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.estadoPersona ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Inmigrante">Inmigrante</option>
                    <option value="Pequeño propietario">Pequeño propietario</option>
                    <option value="Vecino">Vecino</option>
                    <option value="Ranchero">Ranchero</option>
                    <option value="Invalido">Invalido</option>
                  </select>
                  {errors.estadoPersona && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.estadoPersona.message}
                    </p>
                  )}
                </div>

                {/* Fecha de creación */}
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Fecha de creación
                  </label>
                  <input
                    type="text"
                    {...register('fechaCreacion')}
                    value={new Date(watch('fechaCreacion')).toLocaleDateString('es-ES')}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 cursor-not-allowed"
                    readOnly
                  />
                </div>

                {/* Botones de acción */}
                <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white font-medium rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 text-center"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-1">&lt;-</span> Regresar al menú
                    </span>
                  </Link>

                  <button 
                    type="button"
                    onClick={() => {
                      reset();
                      setSelectedClient(null);
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                  >
                    Limpiar
                  </button>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Registrar <span className="ml-1">-&gt;</span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Cart;