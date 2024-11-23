export function latestFeedback(data, rank, row) {
    // Excluimos la primera fila (asumida como encabezado)
    const datosSinEncabezado = data.slice(1);

    // Extraer las fechas y las filas correspondientes
    const fechasFiltradas = datosSinEncabezado.map(fila => ({
        fecha: new Date(fila[0]), // Columna A tiene la fecha
        fila: fila
    }));

    // Ordenamos las fechas en orden descendente (de más reciente a más antigua)
    const fechasOrdenadas = fechasFiltradas.sort((a, b) => b.fecha - a.fecha);

    // Tomamos las primeras 3 fechas más recientes
    const ultimasFechas = fechasOrdenadas.slice(0, 3);

    // Verificamos si el ranking solicitado existe
    if (rank > 0 && rank <= ultimasFechas.length) {
        return ultimasFechas[rank - 1].fila[row]; // Devuelve el correo (columna B) en la posición del ranking
    } else {
        return `No existe una fecha en la posición ${rank} del ranking.`;
    }
}

