import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Sidebar from '../../partials/SideBar';
import Header from "../../partials/Header";
import BarraBusquedaAutomatica from '../../components/customers/BarraBusqueda';
import { crearCuenta } from '../../api/api_account';

const accountSchema = yup.object().shape({
  clienteId: yup.string().required('Debe seleccionar un cliente'),
  estadoPersona: yup.string()
    .required('Debe seleccionar un estado para la persona')
    .oneOf([
      'Estudiante', 'Inmigrante', 'Pequeño propietario', 
      'Vecino', 'Ranchero', 'Invalido'
    ], 'Estado no válido')
});

function Cart() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [fechaActual] = useState(new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showSuccessOptions, setShowSuccessOptions] = useState(false);

  const { 
    register, 
    handleSubmit, 
    setValue,
    reset,
    watch,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(accountSchema)
  });

  const estadoPersonaValue = watch('estadoPersona');

  const selectClient = (client) => {
    setSelectedClient(client);
    setValue('clienteId', client.id);
  };

  const getErrorMessage = (error) => {
    if (!error.response) return 'Error de conexión';
    switch(error.response.status) {
      case 400: return error.response.data?.message || 'Datos inválidos';
      case 500: return 'Error interno del servidor';
      default: return 'Error al crear la cuenta';
    }
  };

  const onSubmit = async (data) => {
    if (!selectedClient) {
      setMessage({ text: 'Debe seleccionar un cliente', type: 'error' });
      return;
    }

    // Validación para menores de 15 años
    if (selectedClient.edad < 15) {
      if (data.estadoPersona !== "Estudiante" && data.estadoPersona !== "Invalido") {
        setMessage({ 
          text: 'Para personas menores de 15 años solo se permite "Estudiante" o "Invalido"', 
          type: 'error' 
        });
        return;
      }
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      const payload = {
        status: data.estadoPersona.toLowerCase(),
        customer_id: selectedClient.id,
        start_date: fechaActual,
        end_date: ""
      };
      
      const response = await crearCuenta(payload);
      
      setMessage({ 
        text: `Cuenta creada exitosamente para ${selectedClient.nombre_completo || 'el cliente'}`, 
        type: 'success' 
      });
      setShowSuccessOptions(true);
      reset();
      setSelectedClient(null);
    } catch (err) {
      setMessage({ 
        text: getErrorMessage(err), 
        type: 'error' 
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
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

              {/* Mensaje de estado */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              {!showSuccessOptions ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <BarraBusquedaAutomatica 
                    name="clienteId"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    selectedClient={selectedClient}
                    setSelectedClient={setSelectedClient}
                  />
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Estado de la persona <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('estadoPersona')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 ${
                        errors.estadoPersona ? 'border-red-500' : 'border-gray-300'
                      } ${
                        selectedClient?.edad < 15 && estadoPersonaValue && 
                        estadoPersonaValue !== "Estudiante" && estadoPersonaValue !== "Invalido" 
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                          : ''
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
                    
                    {/* Mensaje de validación para menores */}
                    {selectedClient?.edad < 15 && estadoPersonaValue && 
                     estadoPersonaValue !== "Estudiante" && estadoPersonaValue !== "Invalido" && (
                      <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">
                        Para menores de 15 años solo se permite "Estudiante" o "Invalido"
                      </p>
                    )}
                    
                    {errors.estadoPersona && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        {errors.estadoPersona.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Fecha de creación
                    </label>
                    <input
                      type="text"
                      value={new Date(fechaActual).toLocaleDateString('es-ES')}
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 cursor-not-allowed"
                      readOnly
                    />
                    <input
                      type="hidden"
                      {...register('fechaCreacion')}
                      value={fechaActual}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/modulo/personas"
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
                        setMessage({ text: '', type: '' });
                      }}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                    >
                      Limpiar
                    </button>

                    <button 
                      type="submit" 
                      disabled={isSubmitting || (selectedClient?.edad < 15 && 
                         estadoPersonaValue && 
                         estadoPersonaValue !== "Estudiante" && 
                         estadoPersonaValue !== "Invalido")}
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
              ) : (
                <div className="text-center">
                  <div className="mb-6 text-green-600 dark:text-green-400">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="mt-2 text-xl font-semibold">{message.text}</p>
                  </div>
                  <Link 
                    to="/modulo/personas" 
                    className="
                      inline-block px-6 py-3
                      bg-white dark:bg-gray-700
                      border border-gray-300 dark:border-gray-600
                      text-gray-800 dark:text-gray-200
                      font-medium rounded-lg
                      shadow-lg
                      transition-all duration-300
                      transform hover:scale-[1.02]
                      hover:shadow-xl
                      active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                      relative overflow-hidden
                      group
                    "
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-2">&lt;-</span> Regresar al menú principal
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Cart;