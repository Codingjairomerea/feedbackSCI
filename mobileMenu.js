// mobileMenu.js
export function initializeMobileMenu() {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuContent = mobileMenu.querySelector('.mobile-menu-content');
    const bq1Content = document.querySelector('.bq1');
    const formulario = document.getElementById('myForm');

    // Función para mostrar notificación
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

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translate(-50%, 0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Función para cerrar el menú
    function closeMenu() {
        mobileMenu.classList.remove('active');
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
    }

    // Función para abrir el menú
    function openMenu() {
        mobileMenu.style.display = 'block';
        setTimeout(() => {
            mobileMenu.classList.add('active');
        }, 10);
        updateMobileMenuContent();
    }

    // Clonar el contenido de bq1 al menú móvil
    function updateMobileMenuContent() {
        mobileMenuContent.innerHTML = '';
        const clone = bq1Content.cloneNode(true);
        
        // Volver a asignar el event listener al botón "Dejar Feedback"
        const dejarFeedbackButton = clone.querySelector('#dejarFeedback');
        if (dejarFeedbackButton) {
            dejarFeedbackButton.addEventListener('click', () => {
                formulario.style.display = "flex";
                closeMenu();
            });
        }

        // Volver a asignar el event listener al botón "Mi Feedback"
        const miFeedbackButton = clone.querySelector('.boton-feedback');
        if (miFeedbackButton) {
            miFeedbackButton.addEventListener('click', () => {
                closeMenu();
                setTimeout(() => {
                    showNotification('Esta funcionalidad aún no está activa, estamos trabajando en ello', 'info');
                }, 300); // Esperar a que se cierre el menú antes de mostrar la notificación
            });
        }
        
        mobileMenuContent.appendChild(clone);
    }

    // Manejar el toggle del menú con el botón
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar el menú al hacer clic fuera
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Actualizar el contenido cuando cambie
    const observer = new MutationObserver(() => {
        if (window.innerWidth <= 768 && mobileMenu.style.display === 'block') {
            updateMobileMenuContent();
        }
    });

    observer.observe(bq1Content, {
        childList: true,
        subtree: true,
        characterData: true
    });
}