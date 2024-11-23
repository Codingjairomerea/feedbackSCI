// miFeedbackHandler.js
export function initializeMiFeedbackButton() {
    // Buscar el botón tanto en la vista normal como en el menú móvil
    const buttons = document.querySelectorAll('.boton-feedback');
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            background-color: ${type === 'info' ? '#777' : '#009fe3'};
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

        // Hacer visible la notificación y animarla hacia abajo
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translate(-50%, 0)';
        }, 100);

        // Remover la notificación
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Añadir el event listener a todos los botones encontrados
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            showNotification('Esta funcionalidad aún no está activa, estamos trabajando en ello.', 'info');
        });
    });
}