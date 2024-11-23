export function changeHeight(elemento, nuevoPorcentaje) {
    if (elemento instanceof HTMLElement) { // Verifica que sea un elemento HTML
        elemento.style.height = nuevoPorcentaje; // Asigna el nuevo porcentaje de altura
    } else {
        console.error('Elemento no encontrado o no es un elemento HTML');
    }
}