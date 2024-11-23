// previewHandler.js

export function createPreviewModal() {
    // Verificar si ya existe el modal
    let modal = document.querySelector('.preview-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'preview-modal';
        modal.innerHTML = `
            <div class="preview-content">
                <div id="preview-body"></div>
                <div class="preview-buttons">
                    <button class="preview-button preview-modify">Modificar</button>
                    <button class="preview-button preview-send">Enviar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    return modal;
}

export function showPreview(formData, onModify, onConfirm) {
    //console.log('Mostrando preview con datos:', formData);
    
    const modal = createPreviewModal();
    const previewBody = modal.querySelector('#preview-body');
    
    // Crear el HTML de previsualización
    const htmlBody = `
        <div style="max-width: 1000px; margin: 40px auto; padding: 20px; background-color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; position: relative; font-family: 'Montserrat', sans-serif;">
            <div style="font-size: 24px; color: #0a4681; line-height: 1.4; padding: 20px 40px;">
                <span style="color: #b91b5e; font-size: 60px; position: absolute; left: 0; top: -20px;">"</span>
                ${formData.situacion} ${formData.comportamiento} ${formData.impacto}
                <span style="color: #b91b5e; font-size: 60px; position: absolute; right: 0; bottom: -20px;">"</span>
                <div style="margin-top: 20px; color: #4d525a; font-style: italic; font-size: 18px;">
                    ${formData.myName}
                </div>
            </div>
        </div>
    `;

    previewBody.innerHTML = htmlBody;
    modal.style.display = 'flex';

    // Configurar botones
    const modifyButton = modal.querySelector('.preview-modify');
    const sendButton = modal.querySelector('.preview-send');

    modifyButton.onclick = () => {
        modal.style.display = 'none';
        if (onModify) onModify();
    };

    sendButton.onclick = () => {
        modal.style.display = 'none';
        if (onConfirm) onConfirm();
    };
}