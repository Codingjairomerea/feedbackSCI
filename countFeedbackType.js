export function contarAparicionesEmailTipoFeedback(data, email, recibido_enviado, tipoFeedback) {
    let conteo = 0;
    var columnaBusqueda = 0
    if (recibido_enviado === "recibido") {
        columnaBusqueda = 1
    } else {
        columnaBusqueda = 7
    }

    var columnaTipoFeedback = 2;

    // Iteramos sobre cada fila de datos
    data.forEach(fila => {
        // Verificamos si el valor en la columna especificada coincide con el email dado
        if (fila[columnaBusqueda] === email && fila[columnaTipoFeedback] === tipoFeedback) {
            conteo++;
        }
    });

    return conteo;
}