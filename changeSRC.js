export function changeSRC(imagen, nuevoSrc) {
    
    // Comprueba si el elemento existe y es una etiqueta <img>
    if (imagen && imagen.tagName === "IMG") {
        // Cambia el valor del atributo src
        imagen.src = nuevoSrc;
    } else {
        console.error("El elemento no es una imagen o no se encontró.");
    }
}