import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import AuthImage from "../images/auth-image.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { EnviarCredenciass } from "../api/api";

function Signup() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch
  } = useForm({
    mode: 'onChange'
  });

  const navigate = useNavigate();
  const [recaptchaError, setRecaptchaError] = useState(null);
  const RECAPTCHA_SITE_KEY = "6Lfah3MrAAAAAAJa92wl13WILgSPPJ9Ep6z41hY8";

  const onSubmit = handleSubmit(data => {
    if (!data.recaptcha) {
      setRecaptchaError("Por favor completa el reCAPTCHA");
      return;
    }
    
    EnviarCredenciass(data);
    navigate('/CompanyProfile');
  });

  const onRecaptchaChange = (value) => {
    setValue('recaptcha', value);
    setRecaptchaError(null);
  };

  return ( 
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link className="block" to="/">
                  <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                    <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <center><h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Bienvenido</h1></center>

              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                      Usuario <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="name" 
                      className={`text-gray-900 dark:bg-gray-100 dark:text-gray-700  form-input w-full ${errors.name ? 'border-red-500' : ''}`} 
                      type="text"
                      {...register("name", {
                        required: 'El usuario es requerido',
                        pattern: {
                          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/,
                          message: 'Solo se permiten letras sin espacios'
                        }
                      })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )} 
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="role">
                      Rol <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="role" 
                      className="text-gray-900 dark:bg-gray-100 dark:text-gray-700 form-select w-full"
                      {...register("role", { required: 'Selecciona un rol' })}
                    >
                      <option value="">Selecciona un rol</option>
                      <option value="delegado">Delegado</option>
                      <option value="subdelegado">Subdelegado</option>
                      <option value="comitiva">Comitiva</option>
                      <option value="vecino">Vecino</option>
                    </select>
                    {errors.role && (
                      <span className="text-red-500 text-sm">{errors.role.message}</span>
                    )}
                  </div>

                  <div>
                    <label className=" block text-sm font-medium mb-1" htmlFor="password">
                      Contraseña <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="password" 
                      className={`text-gray-900 dark:bg-gray-100 dark:text-gray-700  form-input w-full ${errors.password ? 'border-red-500' : ''}`} 
                      type="password" 
                      autoComplete="on"
                      {...register("password", {
                        required: 'La contraseña es requerida',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener al menos 8 caracteres'
                        }
                      })}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )} 
                  </div>
                </div>
                <div className="mt-6">
                  <div className="scale-80 origin-left mb-4">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={onRecaptchaChange}
                    />
                    {recaptchaError && (
                      <span className="text-red-500 text-sm block mt-1">{recaptchaError}</span>
                    )}
                  </div>
                  
                  <br /><br />
                  <button 
                    type="submit" 
                    className="
                      w-full
                      px-6 py-3
                      bg-gradient-to-r from-gray-800 to-gray-900
                      dark:from-gray-100 dark:to-gray-200
                      text-white dark:text-gray-900
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
                    <span className="relative z-10">
                      Ingresar
                    </span>
                    
                    {/* Efecto de hover */}
                    <span className="
                      absolute inset-0
                      bg-gradient-to-r from-violet-600 to-blue-500
                      dark:from-violet-400 dark:to-blue-300
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-300
                    "></span>
                    
                    {/* Efecto de pulsación */}
                    <span className="
                      absolute inset-0
                      bg-white dark:bg-gray-900
                      opacity-0
                      group-active:opacity-20
                      transition-opacity duration-100
                    "></span>
                  </button>
                </div>
              </form>

              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
        </div>
      </div>
    </main>
  );
}

export default Signup;