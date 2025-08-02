// src/pages/DynamicGeneratePay.jsx
import React, { useState, useEffect, lazy, Suspense, useCallback  } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Sidebar from '../partials/SideBar';
import Header from "../partials/Header";
import LoadingSpinner from '../components/LoadingSpinner';
import { crearRegistroPago } from '../api/pagos/api_crear_pago.js';
import { useAuth } from "../utils/AuthContext";


// Componentes dinámicos (carga diferida)
const COMPONENT_CONFIG = {
  obtener_cuenta: lazy(() => import('../components/accounts/GetAccount.jsx')),
  pago_agua: lazy(() => import('../components/modules/AguaCreate.jsx')),
  // pago_panteon: lazy(() => import('../components/modules/PanteonCreate.jsx')),
  // pago_delegacion: lazy(() => import('../components/modules/DelegacionCreate.jsx')),
  // pago_feria: lazy(() => import('../components/modules/feriaCreate.jsx')),
};


// Primero modificamos el schema de validación (al inicio del componente)
const parentSchema = yup.object().shape({
  metodoPago: yup
    .string()
    .required('El método de pago es requerido')
    .oneOf(['efectivo', 'transferencia', 'tarjeta'], 'Método de pago inválido'),
  anioPago: yup
    .number()
    .typeError('El año debe ser un número válido')
    .required('El año de pago es requerido')
    .min(2000, 'El año no puede ser menor a 2000')
    .max(new Date().getFullYear(), 'El año no puede ser mayor al actual')
    .integer('El año debe ser un número entero'),
  cantidadRecibida: yup
    .number()
    .typeError('La cantidad debe ser un número válido')
    .required('La cantidad recibida es requerida')
    .positive('La cantidad debe ser positiva')
    .integer('La cantidad debe ser un número entero')
    .test(
      'max-amount',
      function(value) {
        const { amount } = this.options.context || {};
        return value <= (amount || Infinity);
      }
    )
});

const DynamicGeneratePay = () => {
  const { moduleName } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // <- Aquí se corrige el error
  const [fechaActual] = useState(new Date().toISOString().split('T')[0]);
  const [moduleConfig, setModuleConfig] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
    // Estado para almacenar los datos de la cuenta
  const [accountData, setAccountData] = useState(null); // <- ¡Aquí lo defines!
  const [message, setMessage] = useState({ text: '', type: '' }); // Definido correctamente como objeto
  const [showSuccessOptions, setShowSuccessOptions] = useState(false); // Añadido porque se usa en onSubmit
    // Obtenemos el estado de autenticación
  const { state } = useAuth();
  const { usuario } = state;
  
  // Función para manejar errores
  const getErrorMessage = (error) => {
    return error.response?.data?.message || error.message || 'Ocurrió un error al procesar el pago';
  };


  // Estados para validación
  const [isChildValid, setIsChildValid] = useState(false);
  const [isModuleChildValid, setIsModuleChildValid] = useState(false);
  const [isParentValid, setIsParentValid] = useState(false);


  // Configurar react-hook-form con validaciones Yup solo para campos del padre
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid: isParentFormValid } 
  } = useForm({
    resolver: yupResolver(parentSchema),
    defaultValues: {
      metodoPago: 'efectivo', 
    },
    mode: 'onChange',
    context: {
    amount: moduleData?.amount || 0 // Pasar el amount al contexto para las validaciones
  }
  });


  // Efecto para validar el formulario padre
  useEffect(() => {
    setIsParentValid(isParentFormValid);
  }, [isParentFormValid]);

  // Validación completa (hijo + padre)
  const isFormValid = isChildValid && isParentValid;

  // Cargar configuración del módulo
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const moduleJson = await import(`../components/modules/crear/crear_${moduleName}.json`);
        
        setModuleData({
          ...moduleJson.default,
        });
        
        const config = {
          title: moduleJson.default.title || "Generar Pago",
          formTitle: moduleJson.default.formTitle || "Detalles del Pago",
          submitText: moduleJson.default.submitText || "Generar Pago",
          componentType: COMPONENT_CONFIG[`pago_${moduleName}`] ? `pago_${moduleName}` : 'obtener_cuenta',
          successTitle: moduleJson.default.successTitle || "Pago Registrado",
          successMessage: moduleJson.default.successMessage || "El pago ha sido registrado para"
        };
        
        setModuleConfig(config);
        
      } catch (err) {
        setError(`Error al cargar el módulo: ${err.message}`);
        console.error("Error loading module config:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [moduleName]);

  // Función para manejar cambios en la validez del hijo
  const handleChildValidityChange = useCallback((valid) => {
    setIsChildValid(valid);
  }, []);

  const handleModuleChildValidityChange = useCallback((valid) => {
    setIsModuleChildValid(valid);
  }, []);

//Se DEBE VALIDAR AUN SI FUCNINA CORRECTMAENTE 
const onSubmit = async (data) => {
  try {
    if (!usuario) {
      throw new Error('No hay usuario logueado');
    }
    
    setIsSubmitting(true);
    const payload = {
      ...data,
      DIM_OnwerCustomerId: usuario.DIM_CustomerId,
      DIM_AccountId: accountData.accountId,
      DIM_CustomerId: accountData.customerId,
      ServiceName: moduleName,
      fecha: fechaActual, 
      serviceDetailsType: moduleData.serviceType,
      amount: moduleData.amount,
      AnioPago: data.anioPago,
      movementName: "ingreso",
      FactAmount: data.cantidadRecibida
    };

    const response = await crearRegistroPago(payload);
    
    // Verificar si la respuesta del backend indica un error
    if (response && !response.success) {
      const errorMessage = response.message || 
                         response.data?.message || 
                         'Error desconocido al procesar el pago';
      throw new Error(errorMessage);
    }

    // Usar los mensajes del módulo desde moduleConfig
    setMessage({ 
      text: `${moduleConfig.successMessage || 'Pago registrado exitosamente para'} ${accountData.customerName || 'el cliente'}`, 
      type: 'success' 
    });
    setShowSuccessOptions(true);
    
  } catch (err) {
    // Manejo mejorado de errores
    let errorMessage = 'Error al procesar el pago';
    
    if (err.response) {
      // Error de Axios
      errorMessage = err.response.data?.message || 
        err.response.data?.error || 
        err.message;
    } else if (err.message) {
      // Error personalizado o del backend
      errorMessage = err.message;
    }

    setMessage({ 
      text: errorMessage, 
      type: 'error' 
    });
    console.error('Error en onSubmit:', err);
  } finally {
    setIsSubmitting(false);
  }
};

    // Manejador para recibir datos de la cuenta
  const handleAccountData = useCallback((data) => {
    setAccountData(data); // Ahora setAccountData está definido
  }, []);

  const handleModuleData = useCallback((data) => {
    setModuleData(data); // Ahora setModuleData está definido
  }, []);

  // Renderizar componente de búsqueda de cuenta con validación
  const renderAccountComponent = () => {
    const AccountComponent = COMPONENT_CONFIG.obtener_cuenta;
    
    return (
      <Suspense fallback={<div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />}>
        <AccountComponent 
          onValidityChange={handleChildValidityChange}
          onAccountData={handleAccountData} // Pasamos el manejador
          name="clienteId"
        />
      </Suspense>
    );
  };

  // Obtener componente dinámico con sus props específicas
  const renderModuleComponent = () => {
    if (!moduleConfig || !moduleData) return null;

    const DynamicComponent = COMPONENT_CONFIG[moduleConfig.componentType];

    return (
      <Suspense fallback={<div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />}>
        <DynamicComponent 
        onValidityChange={handleModuleChildValidityChange} // Prop 1: Notifica validez
        onModuleData={handleModuleData}            // Prop 2: Recibe datos del módulo
        // isAccountComponent={moduleConfig.componentType === 'obtener_cuenta'}
        />
      </Suspense>
    );
  };
  if (isLoading) {
    return (
      <div className="flex h-[100dvh] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="grow flex items-center justify-center">
            <LoadingSpinner />
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[100dvh] overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="grow flex items-center justify-center">
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-8 rounded-xl shadow-lg max-w-2xl w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Error</h2>
              <p className="mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Recargar
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              {moduleConfig.title}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Sección de búsqueda de cliente - Siempre visible */}
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Buscar cliente <span className="text-red-500">*</span>
                </label>
                {renderAccountComponent()}
              </div>

              {/* Componente dinámico del módulo específico */}
              {moduleConfig.componentType !== 'obtener_cuenta' && (
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Información del servicio <span className="text-red-500">*</span>
                  </label>
                  {renderModuleComponent()}
                </div>
              )}

              {/* Campos comunes - Siempre visibles */}
              <div className="flex flex-wrap -mx-3 mb-6"> {/* Contenedor flex para alinear horizontalmente */}
                {/* Campo Año de Pago */}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="relative">
                    <label
                      htmlFor="anioPago"
                      className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                    >
                      Año de Pago <span className="text-red-500">*</span>
                      <span
                        className="ml-2 text-gray-500 dark:text-gray-400 cursor-help"
                        title="Indique el año al que corresponde este pago. Puede ser el año actual o años anteriores."
                      >
                        (ℹ️)
                      </span>
                    </label>
                    <input
                      id="anioPago"
                      type="number"
                      {...register('anioPago')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300"
                      placeholder="Ej: 2023"
                      min="2000"
                      max={new Date().getFullYear()}
                    />
                    {errors.anioPago && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.anioPago.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Campo Cantidad Recibida */}
                <div className="w-full md:w-1/2 px-3">
                  <div className="relative">
                    <label
                      htmlFor="cantidadRecibida"
                      className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                    >
                      Cantidad Recibida <span className="text-red-500">*</span>
                      <span
                        className="ml-2 text-gray-500 dark:text-gray-400 cursor-help"
                        title={`Ingrese la cantidad recibida en efectivo (máximo: $${moduleData?.amount || 0})`}
                      >
                        (ℹ️)
                      </span>
                    </label>
                    <input
                      id="cantidadRecibida"
                      type="number"
                      {...register('cantidadRecibida', {
                        valueAsNumber: true,
                        validate: (value) => {
                          console.log('Validating cantidadRecibida:', value, 'Max allowed:', moduleData?.amount);
                          return value <= (moduleData?.amount || Infinity);
                        }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300"
                      placeholder={`Máximo: $${moduleData?.amount || 0}`}
                      min="1"
                      max={moduleData?.amount || undefined}
                      step="1"
                    />
                    {errors.cantidadRecibida && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.cantidadRecibida?.type === 'max' 
                          ? `La cantidad no puede ser mayor a $${moduleData?.amount || 0}`
                          : errors.cantidadRecibida?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Fecha del Pago
                  </label>
                  <input
                    type="date"
                    value={fechaActual}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Método de Pago
                  </label>
                  <input
                    type="text" // Cambiamos a un input de tipo texto
                    value="Efectivo" // Establecemos el valor fijo en "Efectivo"
                    readOnly // Hacemos el campo de solo lectura
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 cursor-not-allowed" // Estilos para indicar que no es editable
                    // Si estás usando React Hook Form, puedes registrarlo para que su valor sea enviado
                    {...register('metodoPago', { value: 'efectivo' })}
                  />
                  {/* El manejo de errores ya no sería necesario para un campo fijo,
                      pero lo dejo comentado por si hay alguna validación en el formulario completo */}
                  {/* {errors.metodoPago && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.metodoPago.message}
                    </p>
                  )} */}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`px-6 py-3 text-white font-medium rounded-lg transition duration-200 ${
                    isSubmitting || !isFormValid 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {moduleConfig.submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default DynamicGeneratePay;