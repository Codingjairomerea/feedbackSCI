import { showPreview } from './previewHandler.js';

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#009fe3' : '#b91b5e'};
        color: white;
        border-radius: 8px;
        font-family: 'Montserrat', Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        text-align: center;
        min-width: 300px;
        max-width: 80%;
        font-weight: 500;
        transform: translate(-50%, -20px);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Hacer visible la notificación
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

export function initializeFormHandler(dependencies) {
    const {
        feedbackForm,
        processingOverlay,
        mainContent,
        formulario,
        enviarCorreoConCopia,
        enviarFormulario,
        IDScriptPOSTCorreo,
        IDScriptPOST,
        emailGuest,
        nameGuest
    } = dependencies;

    const showProcessingState = () => {
        processingOverlay.style.display = 'flex';
        mainContent.classList.add('is-processing');
        feedbackForm.classList.add('is-processing');
    };

    const hideProcessingState = () => {
        processingOverlay.style.display = 'none';
        mainContent.classList.remove('is-processing');
        feedbackForm.classList.remove('is-processing');
    };

    const handleSubmit = async () => {
        try {
            showProcessingState();
            await enviarCorreoConCopia(IDScriptPOSTCorreo, emailGuest, nameGuest);
            const message = await enviarFormulario(IDScriptPOST, emailGuest);
            hideProcessingState();
            formulario.style.display = 'none';
            showNotification(message);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            hideProcessingState();
            showNotification('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.', 'error');
        }
    };

    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        //console.log('Formulario enviado, mostrando preview...');
        
        const formData = {
            situacion: document.getElementById('situation').value,
            comportamiento: document.getElementById('behavior').value,
            impacto: document.getElementById('impact').value,
            myName: nameGuest
        };

        showPreview(
            formData,
            () => {
                //console.log('Modificar clicked');
                // Solo necesitamos ocultar el preview, el usuario puede seguir editando
            },
            () => {
                //console.log('Enviar clicked, iniciando envío...');
                handleSubmit();
            }
        );
    });
}