// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Habilita el plugin de React para Vite
  server: {
    host: '0.0.0.0', // Permite que el servidor sea accesible desde otras IPs en la red
    port: 5173 // Define el puerto en el que se ejecutará la aplicación
  }
});