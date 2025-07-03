import React from 'react';
import BarChart from '../../charts/BarChart03';
import { getCssVariable } from '../../utils/Utils';

function AnalyticsCard03() {
  const chartData = {
    labels: [
      '01-01-2024', '01-02-2024', '02-03-2024',
      '03-04-2024', '04-05-2024', '05-06-2024',
      '03-07-2024', '04-08-2024', '05-09-2024',
      '03-10-2024', '04-11-2024', '05-12-2024',
    ],
    datasets: [
      {
        label: 'Gastos',
        data: [5000, 4000, 4000, 3800, 5200, 5100, 4500, 4800, 4900, 4700, 5100, 5300],
        backgroundColor: getCssVariable('--color-violet-700'),
        hoverBackgroundColor: getCssVariable('--color-violet-800'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      
      
    ],
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Análisis Financiero</h2>
      </header>
      <div className="p-5">
        <BarChart 
          data={chartData} 
          width={window.innerWidth - 100}  // Ajuste dinámico al ancho disponible
          height={400}  // Altura aumentada para mejor visualización
        />
      </div>
    </div>
  );
}

export default AnalyticsCard03;