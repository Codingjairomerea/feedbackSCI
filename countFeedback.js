export function contarAparicionesEmail(data, email, columnaBusqueda) {
    let conteo = 0;

    // Iteramos sobre cada fila de datos
    data.forEach(fila => {
        // Verificamos si el valor en la columna especificada coincide con el email dado
        if (fila[columnaBusqueda] === email) {
            conteo++;
        }
    });

    return conteo;
}