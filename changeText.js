// Función para cambiar el texto de un elemento HTML
export function changeText(elemento, nuevoTexto) {
    if (elemento) { // Verifica si el elemento existe
        elemento.textContent = nuevoTexto; // Cambia el texto del elemento
    } else {
        console.error('Elemento no encontrado');
    }
}