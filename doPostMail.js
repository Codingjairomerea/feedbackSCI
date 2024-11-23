// URL de tu Google Apps Script
export const IDScriptPOSTCorreo = "https://script.google.com/macros/s/AKfycbyHFR_LNeyAa0DCpLfkmoMQ3GhBltG27MdJ8LJ-ybE9V9ipmWgCRffWLxjIj5vyEDnq/exec";

export function enviarCorreoConCopia(IDScriptPOSTCorreo, emailGuest, myName) {
    return new Promise((resolve, reject) => {
        try {
            // Recolecta los datos del formulario
            const destinatario = document.getElementById('email').value;
            const cc = document.getElementById('cc_email').value;
            const asunto = "Has recibido un Feedback de "+ myName;
            const situacion = document.getElementById('situation').value;
            const comportamiento = document.getElementById('behavior').value;
            const impacto = document.getElementById('impact').value;
            var mensaje = `${situacion} ${comportamiento} ${impacto}`;
            var htmlBody = `
                    <div style="max-width: 1000px; margin: 40px auto; padding: 20px; background-color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; position: relative; font-family: 'Montserrat', sans-serif;">
                    <div style="font-size: 24px; color: #0a4681; line-height: 1.4; padding: 20px 40px;">
                        <span style="color: #b91b5e; font-size: 60px; position: absolute; left: 0; top: -20px;">"</span> ${mensaje}
                        <span style="color: #b91b5e; font-size: 60px; position: absolute; right: 0; bottom: -20px;">"</span>
                        <div style="margin-top: 20px; color: #4d525a; font-style: italic; font-size: 18px;"> ${myName} </div>
                    </div>
                    </div>
            `;

            // Crea un objeto con los datos recolectados
            const emailData = {
                email: destinatario,          // Correo destinatario
                cc: cc,                       // Correo en copia (CC)
                asunto: asunto,               // Asunto del correo
                mensaje: mensaje,             // Cuerpo del mensaje
                htmlBody: htmlBody,
            };
            //console.log(emailData);

            // Envía los datos a la Google Apps Script mediante fetch con no-cors
            fetch(IDScriptPOSTCorreo, {
                method: 'POST',
                mode: 'no-cors', // Desactiva CORS para evitar problemas en entorno web
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData) // Convierte los datos a JSON
            })
            .then(() => {
                resolve('Correo enviado con éxito');
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}