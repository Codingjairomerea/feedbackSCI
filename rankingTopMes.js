export function rankingTopMes(data, rank) {
    // Obtenemos el mes y el año actual
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // Índice del mes actual (0 = Enero, 11 = Diciembre)
    const añoActual = fechaActual.getFullYear();

    // Creamos un objeto para contar la cantidad de veces que aparece cada correo
    const conteoCorreos = {};

    // Filtramos las filas donde la columna C tenga "Refuerzo" y la fecha en la columna A sea del mes y año actual
    data.forEach(fila => {
        const fecha = new Date(fila[0]); // Columna A contiene la fecha
        const correo = fila[1]; // Columna B contiene el correo
        const tipoFeedback = fila[2]; // Columna C contiene "Refuerzo"

        // Verificar que sea del año actual, y que en la columna C tenga "Refuerzo"
        if (fecha.getFullYear() === añoActual && tipoFeedback === "Refuerzo") {
            if (correo in conteoCorreos) {
                conteoCorreos[correo]++;
            } else {
                conteoCorreos[correo] = 1;
            }
        }
    });

    // Convertimos el objeto a un array de pares [correo, conteo] y lo ordenamos por el conteo en orden descendente
    const rankingCorreos = Object.entries(conteoCorreos).sort((a, b) => b[1] - a[1]);

    // Verificamos si el ranking solicitado existe
    if (rank > 0 && rank <= rankingCorreos.length) {
        return rankingCorreos[rank - 1][0]; // Devuelve el correo que corresponde al número del ranking
    } else {
        return `No existe un correo en la posición ${rank} del ranking.`;
    }
}
