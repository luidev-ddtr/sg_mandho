import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const DynamicPanteonPaymentComponent = ({ onValidityChange, onModuleData }) => {
  const CURRENT_faenap_COST = 300; // Costo actual para faenap
  const CURRENT_cooperacionp_COST = 400; // Costo para cooperacionpes
  
  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      serviceType: '',
      amount: CURRENT_faenap_COST,
      serviceName: 'panteon',
      description: ''
    }
  });

  const serviceType = watch('serviceType');
  const amount = watch('amount');
  const description = watch('description');

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    if (isValid) {
      onModuleData?.({
        serviceType,
        amount,
        serviceName: 'panteon',
        description
      });
    }
  }, [serviceType, amount, description, isValid, onModuleData]);

  useEffect(() => {
    if (serviceType === 'faenap' || serviceType === 'cooperacionpp') { 
      const cost = serviceType === 'faenap' 
        ? CURRENT_faenap_COST 
        : CURRENT_cooperacionp_COST;
      
      setValue('amount', cost);
      setValue('serviceName', 'panteon');
      
      const description = serviceType === 'faenap' 
        ? 'Pago por faena de panteón' 
        : 'Cooperación para mantenimiento';
      setValue('description', description);
    }
  }, [serviceType, setValue]);

  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo: Tipo de servicio */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Tipo de servicio <span className="text-red-500">*</span>
          </label>
          <select
            {...register('serviceType', { required: true })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          >
            <option value="">Seleccione un tipo</option>
            <option value="faenap">faena de panteón</option>
            <option value="cooperacionp">Cooperación</option>
          </select>
          {errors.serviceType && (
            <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
          )}
        </div>

        {/* Campo: Cantidad */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            {(serviceType === 'faenap' || serviceType === 'cooperacionp') 
              ? `Costo del servicio:`
              : 'Monto ($)'}
          </label>
          {(serviceType === 'faenap' || serviceType === 'cooperacionp') && (
            <div className="relative">
              <input
                type="number"
                {...register('amount')}
                value={serviceType === 'faenap' ? CURRENT_faenap_COST : CURRENT_cooperacionp_COST}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:border-gray-600 dark:text-gray-300"
              />
            </div>
          )}
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
          )}
        </div>

        {/* Campo oculto: serviceName */}
        <input type="hidden" {...register('serviceName')} />

        {/* Campo: Descripción */}
        <div className="mb-4 md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Descripción
          </label>
          <textarea
            {...register('description')}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicPanteonPaymentComponent;