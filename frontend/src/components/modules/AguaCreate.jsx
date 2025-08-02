import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const DynamicWaterPaymentComponent = ({ onValidityChange, onModuleData }) => {
  const CURRENT_WATER_COST = 360; // Costo actual
  
  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      serviceType: '',
      amount: CURRENT_WATER_COST,
      serviceName: 'agua',
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
        serviceName: 'agua',
        description
      });
    }
  }, [serviceType, amount, description, isValid, onModuleData]);

  useEffect(() => {
    if (serviceType === 'tomas' || serviceType === 'consumo') {
      setValue('amount', CURRENT_WATER_COST);
      setValue('serviceName', 'agua');
      
      const description = serviceType === 'tomas' 
        ? 'Pago por toma de agua' 
        : 'Pago por consumo de agua';
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
            <option value="tomas">Tomas de agua</option>
            <option value="consumo">Consumo de agua</option>
            <option value="agregar_toma">Agregar toma</option>
          </select>
          {errors.serviceType && (
            <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
          )}
        </div>

        {/* Campo: Cantidad */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            {(serviceType === 'tomas' || serviceType === 'consumo') 
              ? `El costo del servicio es de`
              : 'Monto ($)'}
          </label>
          {(serviceType === 'tomas' || serviceType === 'consumo') && (
            <div className="relative">
              <input
                type="number"
                {...register('amount')}
                value={CURRENT_WATER_COST}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:border-gray-600 dark:text-gray-300"
              />
            </div>
          )}
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>
          )}
        </div>

        {/* Mensaje para "Agregar toma" */}
        {serviceType === 'agregar_toma' && (
          <div className="md:col-span-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-3 rounded-lg">
            Esta opción aún no está implementada.
          </div>
        )}

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
{/* 
        {/* Nota sobre el costo 
        <div className="md:col-span-2 text-sm text-gray-500 dark:text-gray-400 italic">
          Costo actual del servicio: ${CURRENT_WATER_COST}
        </div> */}
      </div>
    </div>
  );
};

export default DynamicWaterPaymentComponent;
