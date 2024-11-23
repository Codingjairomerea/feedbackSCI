// Función para buscar el correo y obtener el dato de la columna especificada
export function findData(data, email, columnNumber) {
    try {
        const emailColumnIndex = 9; // Índice de la columna J (0-indexed)
        
        // Buscar el índice de la fila que contiene el correo
        const rowIndex = data.findIndex(row => row[emailColumnIndex] === email);

        if (rowIndex !== -1) {
            // Si se encuentra el correo, devolver el dato de la columna indicada
            return data[rowIndex][columnNumber];
        } else {
            console.error('Correo no encontrado:', email);
            return "Pendiente"; // Retorna null si no se encuentra el correo
        }
    } catch (error) {
        console.error('Error al buscar el correo:', error);
    }
}
