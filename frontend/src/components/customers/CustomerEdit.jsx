//editarusuariomodal
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { MostrarUsuarios } from "../../api/api_user";
import { EditarUsuario } from "../../api/api_user";
import { MostrarCuentas } from '../../api/api_account';

// Esquema de validación actualizado - DIM_RoleId ya no es requerido
const editSchema = yup.object().shape({
  CustomerName: yup.string()
    .required('El nombre es requerido')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, 'Solo se permiten letras')
    .transform(value => capitalizeFirstLetter(value)),
  
  CustomerMiddleName: yup.string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]*$/, 'Solo se permiten letras')
    .transform(value => value ? capitalizeFirstLetter(value) : value),
  
  CustomerLastName: yup.string()
    .required('El apellido paterno es requerido')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, 'Solo se permiten letras')
    .transform(value => capitalizeFirstLetter(value)),
  
  CustomerSecondLastName: yup.string()
    .required('El apellido materno es requerido')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, 'Solo se permiten letras')
    .transform(value => capitalizeFirstLetter(value)),
  
  CustomerFraction: yup.string()
    .required('La manzana es requerida')
    .oneOf([
      'tepetate', 
      'cerritos', 
      'garambullo', 
      'yhonda', 
      'centro', 
      'buenavista'
    ], 'Seleccione una manzana válida'),
  
  CustomerAddress: yup.string()
    .required('La calle es requerida'),
  
  CustomerNumberExt: yup.string()
    .required('El número exterior es requerido')
    .test(
      'valid-format',
      'Debe ser solo números o "s/n"',
      (value) => /^[0-9]+$/.test(value) || value?.toLowerCase() === 's/n'
    )
});

function EditCustomerModal({ id_user, onClose, onUpdate }) {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fechaActual] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [originalRoleId, setOriginalRoleId] = useState(null);
  const [hasActiveAccount, setHasActiveAccount] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(editSchema)
  });

  const fractionOptions = [
    { value: 'tepetate', label: 'Tepetate' },
    { value: 'cerritos', label: 'Cerritos' },
    { value: 'garambullo', label: 'Garambullo' },
    { value: 'yhonda', label: 'Yhonda' },
    { value: 'centro', label: 'Centro' },
    { value: 'buenavista', label: 'Buenavista' },
  ];

  const roleOptions = [
    { value: 'Estudiante', label: 'Estudiante' },
    { value: 'Inmigrante', label: 'Inmigrante' },
    { value: 'Pequeño propietario', label: 'Pequeño propietario' },
    { value: 'Vecino', label: 'Vecino' },
    { value: 'Ranchero', label: 'Ranchero' },
    { value: 'Invalido', label: 'Invalido' }
  ];

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      setError(null);

      if (!id_user) {
        setError('ID de usuario no proporcionado');
        setIsLoading(false);
        return;
      }
      
      try {
        const filters = {
          'id_user': id_user,
          'filters': {}
        };
        
        const response = await MostrarUsuarios(filters);
        const responseaccount = await MostrarCuentas(filters);

        if (response?.success && responseaccount?.success) {
          // Filtrar solo la cuenta activa
          const activeAccount = responseaccount.data.body.find(account => 
            account.DIM_StatusId?.toLowerCase() === 'activo'
          );

          // Verificar si hay cuenta activa
          if (activeAccount) {
            setHasActiveAccount(true);
            const capitalizedRole = activeAccount.DIM_RoleId 
              ? capitalizeFirstLetter(activeAccount.DIM_RoleId)
              : activeAccount.DIM_RoleId;

            setOriginalRoleId(capitalizedRole || null);
          } else {
            setHasActiveAccount(false);
            setOriginalRoleId(null);
          }

          const customerData = response.data;
          setCustomer(customerData);
          
          // Resetear el formulario con valores adecuados
          reset({
            DIM_CustomerId: customerData.DIM_CustomerId,
            CustomerName: customerData.CustomerName,
            CustomerMiddleName: customerData.CustomerMiddleName,
            CustomerLastName: customerData.CustomerLastName,
            CustomerSecondLastName: customerData.CustomerSecondLastName,
            CustomerFraction: customerData.CustomerFraction,
            CustomerAddress: customerData.CustomerAddress,
            CustomerNumberExt: customerData.CustomerNumberExt,
            DIM_AccountId: activeAccount ? activeAccount.DIM_AccountId : null,
            DIM_RoleId: activeAccount ? (activeAccount.DIM_RoleId ? capitalizeFirstLetter(activeAccount.DIM_RoleId) : activeAccount.DIM_RoleId) : '',
            DIM_StatusId: activeAccount ? activeAccount.DIM_StatusId : ''
          });
        } else {
          throw new Error('Cliente no encontrado');
        }
      } catch (err) {
        setError(err.message || "Error al cargar los datos del cliente");
        console.error("Error fetching customer:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [id_user, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const payload = {
        DIM_CustomerId: customer.DIM_CustomerId,
        CustomerName: data.CustomerName,
        CustomerMiddleName: data.CustomerMiddleName || 's/n',
        CustomerLastName: data.CustomerLastName,
        CustomerSecondLastName: data.CustomerSecondLastName,
        CustomerAddress: data.CustomerAddress,
        CustomerNumberExt: data.CustomerNumberExt,
        CustomerFraction: data.CustomerFraction,
        // Enviamos false si no hay cuenta activa
        estadoPersona: hasActiveAccount ? data.DIM_RoleId.toLowerCase() : false,
        fechaCuenta: hasActiveAccount ? fechaActual : false,
        EstadoPersonaOriginal: hasActiveAccount ? originalRoleId.toLowerCase() : false
      };
      
      const response = await EditarUsuario(payload);
      
      if (response && response.success) {
        if (onUpdate) {
          onUpdate(response.data);
        }
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error(response.message || "Error al actualizar el usuario");
      }
    } catch (err) {
      setError(err.message || "Error al guardar los cambios");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <header className="px-5 py-4 sticky top-0 bg-white dark:bg-gray-800 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Editar Usuario
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className="p-5">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 rounded-lg">
              {error}
            </div>
          ) : customer ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              {success && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100 rounded-lg">
                  ¡Usuario actualizado correctamente! Cerrando...
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Información del Cliente</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">Fecha de Registro</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">{customer.CustomerStartDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">Fecha de Nacimiento</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">{customer.CustomerDateBirth}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Datos Personales</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300" htmlFor="CustomerName">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="CustomerName"
                      className={`form-input w-full rounded-lg ${errors.CustomerName ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      type="text"
                      {...register("CustomerName")}
                      disabled={isSubmitting || success}
                    />
                    {errors.CustomerName && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.CustomerName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300" htmlFor="CustomerMiddleName">
                      Segundo Nombre
                    </label>
                    <input
                      id="CustomerMiddleName"
                      className={`form-input w-full rounded-lg ${errors.CustomerMiddleName ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      type="text"
                      {...register("CustomerMiddleName")}
                      disabled={isSubmitting || success}
                    />
                    {errors.CustomerMiddleName && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.CustomerMiddleName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300" htmlFor="CustomerLastName">
                      Apellido Paterno <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="CustomerLastName"
                      className={`form-input w-full rounded-lg ${errors.CustomerLastName ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      type="text"
                      {...register("CustomerLastName")}
                      disabled={isSubmitting || success}
                    />
                    {errors.CustomerLastName && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.CustomerLastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300" htmlFor="CustomerSecondLastName">
                      Apellido Materno <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="CustomerSecondLastName"
                      className={`form-input w-full rounded-lg ${errors.CustomerSecondLastName ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      type="text"
                      {...register("CustomerSecondLastName")}
                      disabled={isSubmitting || success}
                    />
                    {errors.CustomerSecondLastName && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.CustomerSecondLastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-300" htmlFor="CustomerFraction">
                    Manzana <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="CustomerFraction"
                    className={`form-select w-full rounded-lg ${errors.CustomerFraction ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                    {...register("CustomerFraction")}
                    disabled={isSubmitting || success}
                  >
                    <option value="">Seleccionar manzana</option>
                    {fractionOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.CustomerFraction && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.CustomerFraction.message}</p>
                  )}
                </div>

                <h3 className="text-lg font-medium pt-4 text-gray-800 dark:text-gray-100">Dirección</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300" htmlFor="CustomerAddress">
                      Calle <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="CustomerAddress"
                      className={`form-input w-full rounded-lg ${errors.CustomerAddress ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      type="text"
                      {...register("CustomerAddress")}
                      disabled={isSubmitting || success}
                    />
                    {errors.CustomerAddress && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.CustomerAddress.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300" htmlFor="CustomerNumberExt">
                      Número Exterior <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="CustomerNumberExt"
                      className={`form-input w-full rounded-lg ${errors.CustomerNumberExt ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      type="text"
                      {...register("CustomerNumberExt")}
                      disabled={isSubmitting || success}
                    />
                    {errors.CustomerNumberExt && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.CustomerNumberExt.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium pt-4 text-gray-800 dark:text-gray-100">Detalles de la Cuenta</h3>
                
                {hasActiveAccount ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-300">
                      Estado de la persona <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={`form-select w-full rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                      {...register("DIM_RoleId")}
                      disabled={isSubmitting || success}
                    >
                      <option value="">Seleccionar estado</option>
                      {roleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-100 rounded-lg mt-2">
                    Este usuario no tiene cuentas activas. La sección de estado de persona está deshabilitada.
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
                  disabled={isSubmitting || success}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-100 rounded-lg">
              No se encontraron datos del cliente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditCustomerModal;