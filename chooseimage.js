export function chooseimage(gender) {
    if (gender.toUpperCase() === "MASCULINO") {
        return "./Imagenes/perfilHombre.png";
    } else if (gender.toUpperCase() === "FEMENINO") {
        return "./Imagenes/perfilMujer.png";
    } else {
        return Math.random() < 0.5 
            ? "./Imagenes/perfilHombre.png" 
            : "./Imagenes/perfilMujer.png";
    }
}