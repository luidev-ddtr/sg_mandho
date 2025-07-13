import React from 'react';
import BarChart from '../../charts/BarChart03';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyBarChart = ({ data }) => {
  // Configuración del gráfico
  const options = {
    responsive: true, // Hace el gráfico responsivo
    maintainAspectRatio: false, // Permite controlar el tamaño libremente
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Datos por Mes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    barThickness: 30, // Controla el grosor de las barras
    categoryPercentage: 0.8, // Controla el espacio entre categorías (meses)
    barPercentage: 0.9, // Controla el ancho de las barras dentro de cada categoría
  };

  // Datos del gráfico
  const chartData = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
      {
        label: 'Valores por Mes',
        data: data || Array(12).fill(0), // Usa datos proporcionados o ceros
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '400px',
      margin: '0 auto'
    }}>
      <BarChart options={options} data={chartData} />
    </div>
  );
};

export default MonthlyBarChart;