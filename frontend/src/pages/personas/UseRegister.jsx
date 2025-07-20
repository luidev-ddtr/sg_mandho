import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../../partials/SideBar';
import Header from "../../partials/Header";
import OnboardingImage from "../../images/onboarding-image.jpg";
import { AgregarUsuario } from "../../api/api_user";
import { AgregarFechaActual } from '../../utils/add_date';
import { AgregarFechaFinVacio } from "../../utils/add_date";

/*
  This JavaScript function, capitalizeFirstLetter, takes a string as input and returns a new string
  with the first letter capitalized and the rest of the letters in lowercase. If the input is empty 
  or null, it returns the original value. {UseRegister.jsx:capitalizeFirstLetter}
 */
const capitalizeFirstLetter = (value) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

// Agregar fecha de inicio y fecha de fin, ya que estqa no se estan agregando \
// en las data del json

// Esquema de validación
const schema = yup.object().shape({
  nombre: yup.string()
    .required('El nombre es requerido')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, 'Solo se permiten letras')
    .transform(value => capitalizeFirstLetter(value))
    .test('single-word', 'Solo se permite una palabra', value => {
      return value && value.split(' ').length === 1;
    }),
  
  segundo_nombre: yup.string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]*$/, 'Solo se permiten letras')
    .transform(value => value ? capitalizeFirstLetter(value) : value)
    .test('single-word', 'Solo se permite una palabra', value => {
      return !value || value.split(' ').length === 1;
    }),
  
  apellido: yup.string()
    .required('El apellido paterno es requerido')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, 'Solo se permiten letras')
    .transform(value => capitalizeFirstLetter(value))
    .test('single-word', 'Solo se permite una palabra', value => {
      return value && value.split(' ').length === 1;
    }),
  
  segundo_apellido: yup.string()
    .required('El apellido materno es requerido')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, 'Solo se permiten letras')
    .transform(value => capitalizeFirstLetter(value))
    .test('single-word', 'Solo se permite una palabra', value => {
      return value && value.split(' ').length === 1;
    }),
  
  manzana: yup.string()
    .required('La manzana es requerida')
    .oneOf([
      'tepetate', 
      'cerritos', 
      'garambullo', 
      'yhonda', 
      'centro', 
      'buenavista'
    ], 'Seleccione una manzana válida'),
  
  calle: yup.string()
    .required('La calle es requerida'),
  
  n_exterior: yup.string()
    .required('El número exterior es requerido')
    .test(
      'valid-format',
      'Debe ser solo números o "s/n"',
      (value) => /^[0-9]+$/.test(value) || value?.toLowerCase() === 's/n'
    ),

fecha_nacimiento: yup
  .mixed() // Cambiamos de date() a mixed() para mayor flexibilidad
  .required('La fecha de nacimiento es requerida')
  .test('is-valid-date', 'La fecha de nacimiento no es válida', (value) => {
    // Si es un objeto Date, es válido
    if (value instanceof Date) return !isNaN(value.getTime());
    // Si es una string (del input type="date"), verificamos el formato
    if (typeof value === 'string') {
      return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());
    }
    return false;
  })
  .transform(function (value, originalValue) {
    // Si el valor original es una string vacía, devolvemos null
    if (originalValue === '') return null;
    
    // Si es una string del input type="date" (formato YYYY-MM-DD)
    if (typeof originalValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(originalValue)) {
      return originalValue; // Mantenemos el formato ISO
    }
    
    // Si es un objeto Date, lo convertimos a string ISO
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    
    return value;
  })
  .test('min-date', 'La fecha de nacimiento no puede ser anterior a 1940', (value) => {
    if (!value) return true;
    const date = new Date(value);
    const minDate = new Date(1940, 0, 1);
    return date >= minDate;
  })
  .test('max-date', 'La fecha de nacimiento no puede ser posterior a la fecha actual', (value) => {
    if (!value) return true;
    const date = new Date(value);
    const today = new Date();
    return date <= today;
  }),
});

/**
 * Componente de registro de usuarios.
 * 
 * Contiene un formulario que solicita los datos personales del usuario y su dirección.
 * Al enviar el formulario, se llama a la función `onSubmit` que se encarga de
 * agregar el usuario a la base de datos.
 * 
 * @returns {ReactElement} Componente JSX del formulario de registro.
 */
function UserRegister() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const fechaData = AgregarFechaActual();
      const fechaFin = AgregarFechaFinVacio();
      
      const dataConFecha = {
        ...formData,
        ...fechaData,
        ...fechaFin
      };

      const requestData = {
        data: dataConFecha
      };

      const response = await AgregarUsuario(requestData);

      console.log("Respuesta del endpoint front:", response.id);
      
      if (response.id) {
        setSubmitSuccess(true);
        // Pequeño delay para que el usuario vea el mensaje de éxito
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate(`/personas/registro_exito/${response.id}`);
      } else {
        throw new Error('El backend no devolvió un ID de usuario');
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setSubmitError(error.response?.data?.message || error.message || "Error en el registro");
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} variant="v2" />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} variant="v3" />

        <main className="grow">
          <div className="flex h-full">
            {/* Form container */}
            <div className="w-full md:w-2/3 px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-lg mx-auto h-full flex flex-col">
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Agregar Usuario</h1>
                </div>
                
                {/* Mensaje de éxito */}
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center animate-fade-in">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>¡Registro exitoso! Redirigiendo...</span>
                  </div>
                )}
                
                {/* Mensaje de error */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center animate-fade-in">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex-1">
                  <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                    <div className="space-y-6 mb-8 flex-1">
                      {/* Nombre y segundo nombre */}
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm mb-1 font-black" htmlFor="nombre">
                            Nombre <span className="text-red-500">*</span>
                          </label>
                          <input 
                            id="nombre" 
                            className={`text-gray-900 dark:bg-gray-100 dark:text-gray-700 form-input w-full rounded-lg ${errors.nombre ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                            type="text" 
                            {...register("nombre")}
                            onBlur={(e) => {
                              if (e.target.value) {
                                setValue('nombre', capitalizeFirstLetter(e.target.value));
                              }
                            }}
                            disabled={isSubmitting}
                          />
                          {errors.nombre && (
                            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                              {errors.nombre.message}
                            </span>
                          )} 
                        </div>
                        
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1" htmlFor="segundo_nombre">
                            Segundo Nombre
                          </label>
                          <input 
                            id="segundo_nombre" 
                            className={`text-gray-900 dark:bg-gray-100 dark:text-gray-700 form-input w-full rounded-lg ${errors.segundo_nombre ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                            type="text" 
                            {...register("segundo_nombre")}
                            onBlur={(e) => {
                              if (e.target.value) {
                                setValue('segundo_nombre', capitalizeFirstLetter(e.target.value));
                              }
                            }}
                            disabled={isSubmitting}
                          />
                          {errors.segundo_nombre && (
                            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                              {errors.segundo_nombre.message}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Apellidos */}
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1" htmlFor="apellido">
                            Apellido paterno <span className="text-red-500">*</span>
                          </label>
                          <input 
                            id="apellido" 
                            className={`dark:text-gray-700 dark:bg-gray-100 form-input w-full rounded-lg ${errors.apellido ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                            type="text"
                            {...register("apellido")}
                            onBlur={(e) => {
                              if (e.target.value) {
                                setValue('apellido', capitalizeFirstLetter(e.target.value));
                              }
                            }}
                            placeholder="Escribe tu apellido paterno"
                            disabled={isSubmitting}
                          />
                          {errors.apellido && (
                            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                              {errors.apellido.message}
                            </span>
                          )} 
                        </div>
                        
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1" htmlFor="segundo_apellido">
                            Apellido Materno <span className="text-red-500">*</span>
                          </label>
                          <input 
                            id="segundo_apellido" 
                            className={`dark:text-gray-700 dark:bg-gray-100 form-input w-full rounded-lg ${errors.segundo_apellido ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                            type="text"
                            {...register("segundo_apellido")}
                            onBlur={(e) => {
                              if (e.target.value) {
                                setValue('segundo_apellido', capitalizeFirstLetter(e.target.value));
                              }
                            }}
                            placeholder="Escribe tu apellido materno"
                            disabled={isSubmitting}
                          />
                          {errors.segundo_apellido && (
                            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                              {errors.segundo_apellido.message}
                            </span>
                          )} 
                        </div>
                      </div>
          
                      {/* Manzana */}
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="manzana">
                          Manzana <span className="text-red-500">*</span>
                        </label>
                        <select 
                          id="manzana" 
                          className={`form-select dark:text-gray-800 w-full rounded-lg ${errors.manzana ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          {...register("manzana")}
                          disabled={isSubmitting}
                        >
                          <option value="">Seleccione una opción</option>
                          <option value="tepetate">Tepetate</option>
                          <option value="cerritos">Cerritos</option>
                          <option value="garambullo">Garambullo</option>
                          <option value="yhonda">Yhonda</option>
                          <option value="centro">Centro</option>
                          <option value="buenavista">Buena Vista</option>
                        </select>
                        {errors.manzana && (
                          <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                            {errors.manzana.message}
                          </span>
                        )}
                      </div>
                      
                      {/* Dirección */}
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1" htmlFor="calle">
                            Calle <span className="text-red-500">*</span>
                          </label>
                          <input 
                            id="calle" 
                            className={`dark:text-gray-700 dark:bg-gray-100 form-input w-full rounded-lg ${errors.calle ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                            type="text"
                            {...register("calle")}
                            placeholder="Escribe la dirección"
                            disabled={isSubmitting}
                          />
                          {errors.calle && (
                            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                              {errors.calle.message}
                            </span>
                          )} 
                        </div>
                        
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1" htmlFor="n_exterior">
                            Número Exterior <span className="text-red-500">*</span>
                          </label>
                          <input 
                            id="n_exterior" 
                            className={`dark:text-gray-700 dark:bg-gray-100 form-input w-full rounded-lg ${errors.n_exterior ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                            type="text"
                            {...register("n_exterior")}
                            inputMode="numeric"
                            placeholder="Escribe el numero exterior"
                            disabled={isSubmitting}
                          />
                          {errors.n_exterior && (
                            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                              {errors.n_exterior.message}
                            </span>
                          )} 
                        </div>
                      </div>
                      
                      {/* Fecha de nacimiento */}
                      <div className="flex space-x-4">
                        <div className="flex-1 relative">
                          <label className="block text-sm font-medium mb-1" htmlFor="fecha_nacimiento">
                            Fecha de Nacimiento <span className="text-red-500">*</span>
                          </label>
                          
                          {/* Contenedor relativo para posicionar el icono */}
                          <div className="relative">
                            <input 
                              id="fecha_nacimiento" 
                              className={`dark:text-gray-900 dark:bg-gray-100 form-input w-full rounded-lg pl-10 pr-3 py-2 ${
                                errors.fecha_nacimiento ? 'border-red-500' : 'border-gray-300'
                              } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
                              type="date"
                              {...register("fecha_nacimiento")}
                              max={new Date().toISOString().split('T')[0]}
                              disabled={isSubmitting}
                            />
                            
                            {/* Icono de calendario */}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg 
                                className="w-5 h-5 text-gray-400 dark:text-gray-500" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                />
                              </svg>
                            </div>
                          </div>
                          
                          {errors.fecha_nacimiento && (
                            <span className="text-red-500 text-sm mt-1 block animate-fade-in">
                              {errors.fecha_nacimiento.message}
                            </span>
                          )} 
                        </div>
                        
                        <div className="flex-1">
                          {/* Espacio para otro campo si es necesario */}
                        </div>
                      </div>
                    </div>
                      
                    {/* Botones de acción */}
                    <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/modulo/personas"
                        className={`
                          flex-1 px-6 py-3
                          bg-gradient-to-r from-gray-100 to-gray-200
                          dark:from-gray-800 dark:to-gray-900
                          text-gray-900 dark:text-white
                          font-medium rounded-lg shadow-lg
                          transition-all duration-300
                          transform hover:scale-[1.02] hover:shadow-xl
                          active:scale-95 focus:outline-none
                          relative overflow-hidden group text-center
                          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                        `}
                        onClick={(e) => isSubmitting && e.preventDefault()}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <span className="mr-1">&lt;-</span> Regresar al menú
                        </span>
                      </Link>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`
                          flex-1 px-6 py-3
                          bg-gradient-to-r from-gray-800 to-gray-900
                          dark:from-gray-100 dark:to-gray-200
                          text-white dark:text-gray-900
                          font-medium rounded-lg shadow-lg
                          transition-all duration-300
                          relative overflow-hidden group
                          ${isSubmitting ? 'cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-xl'}
                          active:scale-95 focus:outline-none
                        `}
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
                          <span className="relative z-10 flex items-center justify-center">
                            Registrar <span className="ml-1">-&gt;</span>
                          </span>
                        )}
                        
                        {/* Efecto de hover (solo cuando no está submitting) */}
                        {!isSubmitting && (
                          <span className="
                            absolute inset-0
                            bg-gradient-to-r from-violet-600 to-blue-500
                            dark:from-violet-400 dark:to-blue-300
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity duration-300
                          "></span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Image container */}
            <div className="hidden md:block w-1/3 relative">
              <img 
                className="absolute inset-0 object-cover object-center w-full h-full" 
                src={OnboardingImage} 
                alt="Onboarding" 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserRegister;