export function dateFormated(fechaISO) {
    try {
        // Verificar si la fecha es válida
        if (!fechaISO || fechaISO === "" || fechaISO === "undefined") {
            return "Pendiente";
        }

        // Convertir la cadena ISO en un objeto Date
        const fecha = new Date(fechaISO);

        // Verificar si la fecha es válida
        if (isNaN(fecha.getTime())) {
            return "Pendiente";
        }

        // Ajustar la fecha a la zona horaria LATAM (UTC-5)
        const opciones = { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' };

        // Formatear la fecha en el formato deseado "DD/MM/YYYY"
        const fechaFormateada = fecha.toLocaleDateString('es-PE', opciones);

        return fechaFormateada;
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return "Pendiente";
    }
}