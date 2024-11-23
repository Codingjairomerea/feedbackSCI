export const IDScriptPOST = "https://script.google.com/macros/s/AKfycbzaZXanYaI1OdSX-On_0pKTm8K57bbpTr02juCvh0LIkobZoCJ8pSUPQIfcDer39Tb2/exec";

export function enviarFormulario(IDScriptPOST, emailGuest) {
    return new Promise((resolve, reject) => {
        // Recolecta los datos del formulario
        const email = document.getElementById('email').value;
        const tipoFeedback = document.getElementById('feedbackType').value;
        const situacion = document.getElementById('situation').value;
        const comportamiento = document.getElementById('behavior').value;
        const impacto = document.getElementById('impact').value;

        // Crea un objeto con los datos recolectados
        const feedbackData = {
            email: email,
            tipoFeedback: tipoFeedback,
            situacion: situacion,
            comportamiento: comportamiento,
            impacto: impacto,
            feedbackConcatenado: `${situacion} ${comportamiento} ${impacto}`,
            emailSender: emailGuest
        };
        //console.log(feedbackData);

        // Envía los datos a la Google Apps Script mediante fetch con no-cors
        fetch(IDScriptPOST, {
            method: 'POST',
            mode: 'no-cors', // Desactiva CORS
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData) // Convierte los datos a JSON
        })
        .then(() => {
            // Como no puedes acceder a la respuesta en 'no-cors', solo muestra un mensaje de éxito
            document.getElementById('feedbackForm').reset();
            resolve('Feedback enviado con éxito');
        })
        .catch(error => {
            console.error('Error:', error); // Muestra errores en la consola
            reject(error);
        });
    });
}