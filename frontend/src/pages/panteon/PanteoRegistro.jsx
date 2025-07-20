import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../../partials/SideBar';
import Header from "../../partials/Header";
import BarraBusquedaAutomatica from '../../components/customers/BarraBusqueda';
//import { registrarPago } from "../../api/api_pagos"; // Asume que tienes esta API
import { MostrarCuentas } from '../../api/api_account';
// Esquema de validación para pagos
const pagoSchema = yup.object().shape({
  clienteId: yup.string().required('Debe seleccionar un cliente'),
  cantidad: yup.number()
    .required('La cantidad es requerida')
    .positive('La cantidad debe ser positiva'),
  tipoPago: yup.string()
    .required('Seleccione el tipo de pago')
    .oneOf(['faena', 'cooperacion'], 'Tipo de pago no válido'),
  fechaPago: yup.date().default(() => new Date()),
  observaciones: yup.string().optional()
});

function PanteonRegistro() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [pagosExistentes, setPagosExistentes] = useState([]);
  const [loadingPagos, setLoadingPagos] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    setValue,
    reset,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(pagoSchema),
    defaultValues: {
      fechaPago: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
    }
  });

  // Cargar pagos existentes cuando se selecciona un cliente
  useEffect(() => {
    const cargarPagos = async () => {
      if (selectedClient?.id) {
        setLoadingPagos(true);
        try {
          const response = await MostrarCuentas(selectedClient.id);
          setPagosExistentes(response.data || []);
        } catch (err) {
          console.error('Error al cargar pagos:', err);
          setPagosExistentes([]);
        } finally {
          setLoadingPagos(false);
        }
      }
    };

    cargarPagos();
  }, [selectedClient]);

  // Seleccionar cliente
  const selectClient = (client) => {
    setSelectedClient(client);
    setValue('clienteId', client.id);
    setValue('clienteNombre', client.nombre_completo);
  };

  const onSubmit = async (formData) => {
    if (!selectedClient) {
      setSubmitError('Debe seleccionar un cliente primero');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const response = await registrarPago({
        ...formData,
        clienteId: selectedClient.id
      });
      
      if (response.data && response.data.id) {
        setSubmitSuccess(true);
        // Recargar pagos después de registrar uno nuevo
        const updatedPagos = await MostrarCuentas(selectedClient.id);
        setPagosExistentes(updatedPagos.data || []);
        
        // Resetear solo los campos del pago, no el cliente seleccionado
        reset({
          cantidad: '',
          tipoPago: '',
          observaciones: '',
          fechaPago: new Date().toISOString().split('T')[0]
        });
        
        // Opcional: redirigir después de éxito
        // navigate('/pagos/exito');
      } else {
        throw new Error('El backend no devolvió un ID de pago');
      }
    } catch (error) {
      console.error("Error al registrar pago:", error);
      setSubmitError(error.response?.data?.message || error.message || "Error al registrar el pago");
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
                Registro de Pago al Comité de Panteón
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded-lg">
                  ¡Pago registrado exitosamente!
                </div>
              )}
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Sección Cliente con Buscador */}
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Buscar Cliente <span className="text-red-500">*</span>
                  </label>
                  <BarraBusquedaAutomatica 
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    selectedClient={selectedClient}
                    setSelectedClient={selectClient}
                  />
                </div>
                  FALTA AGREGAR Y CAMBIAR ESTA PARTE, YA QUE ACTUALMENTE ESTA BUSCANDO PAGOS ASOCIADOS, 
                {/* Sección de Pagos Existentes */}
                {selectedClient && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                      Pagos registrados de {selectedClient.nombre_completo}
                    </h3>
                    
                    {loadingPagos ? (
                      <div className="p-4 text-center text-gray-500">
                        Cargando historial de pagos...
                      </div>
                    ) : pagosExistentes.length > 0 ? (
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipo</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cantidad</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Observaciones</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {pagosExistentes.map(pago => (
                              <tr key={pago.id}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                  {new Date(pago.fechaPago).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">
                                  {pago.tipoPago}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                  ${pago.cantidad.toFixed(2)}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200">
                                  {pago.observaciones || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        No se encontraron pagos registrados
                      </div>
                    )}
                  </div>
                )}

                {/* Campos para nuevo pago */}
                {selectedClient && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                      Registrar Nuevo Pago
                    </h3>
                    
                    {/* Cantidad */}
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                        Cantidad ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('cantidad')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 ${
                          errors.cantidad ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.cantidad && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                          {errors.cantidad.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Tipo de Pago */}
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                        Tipo de Pago <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register('tipoPago')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 ${
                          errors.tipoPago ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isSubmitting}
                      >
                        <option value="">Seleccione el tipo</option>
                        <option value="faena">Faena</option>
                        <option value="cooperacion">Cooperación</option>
                      </select>
                      {errors.tipoPago && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                          {errors.tipoPago.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Fecha de Pago */}
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                        Fecha de Pago
                      </label>
                      <input
                        type="date"
                        {...register('fechaPago')}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    {/* Observaciones */}
                    <div className="mb-6">
                      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                        Observaciones
                      </label>
                      <textarea
                        {...register('observaciones')}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/pagos"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white font-medium rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 text-center"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-1">&lt;-</span> Regresar
                    </span>
                  </Link>

                  <button 
                    type="button"
                    onClick={() => {
                      reset();
                      setSelectedClient(null);
                      setPagosExistentes([]);
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                  >
                    Limpiar
                  </button>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !selectedClient}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registrando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Registrar Pago <span className="ml-1">-&gt;</span>
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

export default PanteonRegistro;