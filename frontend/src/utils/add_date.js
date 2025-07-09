/**
 * Genera un objeto con la fecha actual en formato YYYY-MM-DD
 * @returns {Object} Objeto con la clave 'fecha_inicio' y la fecha actual como valor
 */
export const AgregarFechaActual = () => {
    // Obtener la fecha actual
    const fechaActual = new Date();
    
    // Formatear la fecha a YYYY-MM-DD
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    
    const fechaFormateada = `${año}-${mes}-${dia}`;
    
    // Retornar el objeto con la fecha
    return {
        fecha_inicio: fechaFormateada
    };
};

export const AgregarFechaFinVacio = () => {
    // Obtener la fecha actual
    const fechaActual = new Date();
    
    // Formatear la fecha a YYYY-MM-DD
    const fechaFormateada = 's/n';
    
    // Retornar el objeto con la fecha
    return {
        fecha_fin: fechaFormateada
    };
};