import { getData, GET_URL, getDataRow } from './doGet.js';
import {EmailSuggestions} from './mailAutocomplete.js';
import {enviarFormulario, IDScriptPOST} from './doPost.js';
import {enviarCorreoConCopia, IDScriptPOSTCorreo} from './doPostMail.js';
import { findData } from './findData.js';
import { changeText } from './changeText.js';
import { getDataFeedback, GET_URL_FEEDBACK } from './doGetFeedback.js';
import { rankingTopMes } from './RankingTopMes.js';
import { latestFeedback } from './latestFeedback.js';
import { dateFormated } from './dateFormated.js';
import { chooseimage } from './chooseimage.js';
import { changeSRC } from './changeSRC.js';
import { contarAparicionesEmail} from './countFeedback.js';
import {contarAparicionesEmailTipoFeedback} from './countFeedbackType.js';
import {changeHeight} from './changeHeight.js';
import { initializeFormHandler } from './formHandler.js';
import { initializeMobileMenu } from './mobileMenu.js';
import { initializeMiFeedbackButton } from './miFeedbackHandler.js';

/* ------------------------- INITIALIZE APP ------------------------ */

async function initializeApp() {
    try {
        // PASO 1: Cargar Datos
        //console.log('1. Comenzando carga de datos');
        const [data, dataFeedback] = await Promise.all([
            getData(),
            getDataFeedback()
        ]);

// Inicializar menú móvil después de que los datos estén cargados
initializeMobileMenu();

// Inicializar el Listener del boton My Feedback
initializeMiFeedbackButton();

//Variables de formulario
//console.log('2. Configurando variables');
var formulario = document.getElementById("myForm")
var openForm = document.getElementById("dejarFeedback")
var closeForm = document.getElementById("close")
var dataMail = getDataRow(data , 9)
const emailInput = document.getElementById('email');
const suggestionsList = document.getElementById('emailSuggestions');

//console.log('3. Configurando event listeners');
document.getElementById("emailSuggestions").addEventListener("click", function() {
    const email = emailInput.value; // Obtener el email seleccionado en el formulario
    // Llamada a la función findData y obtener el resultado
    const result = findData(data, email, 6);
    
    // Colocar el resultado dentro del elemento con id "formMailName"
    document.getElementById("formMailName").textContent = result;
});


//Variables del bloque 1
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const myName = document.getElementById("myName");
const myJobName = document.getElementById("myJobName");
const imgGuest = document.getElementById("imgGuest")
var emailGuest = "invitado@project.com";
var genderGuest = findData(data,emailGuest,11);
var imagenInvitado = chooseimage(genderGuest);
var nameGuest = findData(data,emailGuest,6);
var jobNameGuest = findData(data,emailGuest,8);

//Variables Resumen de actividad de feedback
const feedbackRecibidos = document.getElementById("feedbackRecibidos");
const feedbackEnviados = document.getElementById("feedbackEnviados");
const totalFeedbackRefuerzoRecibido = document.getElementById("totalFeedbackRefuerzoRecibido");
const totalFeedbackCambioRecibido = document.getElementById("totalFeedbackCambioRecibido");
const totalFeedbackRefuerzoEnviado = document.getElementById ("totalFeedbackRefuerzoEnviado");
const totalFeedbackCambioEnviado = document.getElementById ("totalFeedbackCambioEnviado");
const porcentajeRefuerzoFeedbackEnviado = document.getElementById ("porcentajeRefuerzoFeedbackEnviado");
const porcentajeCambioFeedbackEnviado = document.getElementById ("porcentajeCambioFeedbackEnviado");
const porcentajeRefuerzoFeedbackRecibido = document.getElementById ("porcentajeRefuerzoFeedbackRecibido");
const porcentajeCambioFeedbackRecibido = document.getElementById ("porcentajeCambioFeedbackRecibido");
var totalReceivedFeedback = contarAparicionesEmail(dataFeedback, emailGuest, 1);
var totalSentFeedback = contarAparicionesEmail(dataFeedback, emailGuest, 7);
var totalReinforcementRecivedFeedback = contarAparicionesEmailTipoFeedback(dataFeedback,emailGuest, "recibido", "Refuerzo");
var totalChangeRecivedFeedback = contarAparicionesEmailTipoFeedback(dataFeedback,emailGuest, "recibido", "Cambio")
var totalReinforcementSentFeedback = contarAparicionesEmailTipoFeedback(dataFeedback,emailGuest, "enviado", "Refuerzo");
var totalChangeSentFeedback = contarAparicionesEmailTipoFeedback(dataFeedback,emailGuest, "enviado", "Cambio");
var percentageReinforcementSentFeedback = (totalReinforcementSentFeedback/totalSentFeedback)*100+"%";
var percentageChangeSentFeedback = (totalChangeSentFeedback/totalSentFeedback)*100+"%";
var percentageReinforcementRecivedFeedback = (totalReinforcementRecivedFeedback/totalReceivedFeedback)*100+"%";
var percentageChangeRecivedFeedback = (totalChangeRecivedFeedback/totalReceivedFeedback)*100+"%";

//Variables Bloque Top Reconocimientos del mes
var emailTop1 = rankingTopMes(dataFeedback, 1);
var emailTop2 = rankingTopMes(dataFeedback, 2);
var emailTop3 = rankingTopMes(dataFeedback, 3);
const imgTop1 = document.getElementById("imgTop1");
const imgTop2 = document.getElementById("imgTop2");
const imgTop3 = document.getElementById("imgTop3");
var genderTop1 = findData(data,emailTop1,11);
var genderTop2 = findData(data,emailTop2,11);
var genderTop3 = findData(data,emailTop3,11);
var ImagenTop1 = chooseimage(genderTop1);
var ImagenTop2 = chooseimage(genderTop2);
var ImagenTop3 = chooseimage(genderTop3);
const nombreTop1 = document.getElementById("nombreTop1");
const nombreTop2 = document.getElementById("nombreTop2");
const nombreTop3 = document.getElementById("nombreTop3");
var nameTop1 = findData(data,emailTop1,6);
var nameTop2 = findData(data,emailTop2,6);
var nameTop3 = findData(data,emailTop3,6);

//Variables de últimos colaboradores que recibieron feedback
const receptorFeedback1 = document.getElementById("receptorFeedback1");
const receptorFeedback2 = document.getElementById("receptorFeedback2");
var emailfeedbackreceiver1 = latestFeedback(dataFeedback,1,1);
var emailfeedbackreceiver2 = latestFeedback(dataFeedback,2,1);
var feedbackreceiver1 = findData(data, emailfeedbackreceiver1,6);
var feedbackreceiver2 = findData(data, emailfeedbackreceiver2,6);


//Variables Ultimos colaboradores que enviaron feedback
var emailLatestSenders1 = latestFeedback(dataFeedback,1,7);
var emailLatestSenders2 = latestFeedback(dataFeedback,2,7);
var emailLatestSenders3 = latestFeedback(dataFeedback,3,7);
const fotoUltimosenvios1 = document.getElementById("fotoUltimosenvios1");
const fotoUltimosenvios2 = document.getElementById("fotoUltimosenvios2");
const fotoUltimosenvios3 = document.getElementById("fotoUltimosenvios3");
var genderLatestSenders1 = findData(data,emailLatestSenders1,11);
var genderLatestSenders2 = findData(data,emailLatestSenders2,11);
var genderLatestSenders3 = findData(data,emailLatestSenders3,11);
var imgLatestSenders1 = chooseimage(genderLatestSenders1);
var imgLatestSenders2 = chooseimage(genderLatestSenders2);
var imgLatestSenders3 = chooseimage(genderLatestSenders3);
const nombreUltimosenvios1 = document.getElementById("nombreUltimosenvios1");
const nombreUltimosenvios2 = document.getElementById("nombreUltimosenvios2");
const nombreUltimosenvios3 = document.getElementById("nombreUltimosenvios3");
var nameLatestSenders1 = findData(data,emailLatestSenders1,6);
var nameLatestSenders2 = findData(data,emailLatestSenders2,6);
var nameLatestSenders3 = findData(data,emailLatestSenders3,6);
const fechaUltimosenvios1 = document.getElementById("fechaUltimosenvios1");
const fechaUltimosenvios2 = document.getElementById("fechaUltimosenvios2");
const fechaUltimosenvios3 = document.getElementById("fechaUltimosenvios3");
var dateLatestSenders1 = dateFormated(latestFeedback(dataFeedback,1,0));
var dateLatestSenders2 = dateFormated(latestFeedback(dataFeedback,2,0));
var dateLatestSenders3 = dateFormated(latestFeedback(dataFeedback,3,0));




// ----------- ACTIVAR FUNCIONALIDADES DEL FORMULARIO ---------------------
// Abrir la ventana modal al hacer clic en el botón
openForm.onclick = function() {
    formulario.style.display="flex";
}

// Cerrar la ventana modal al hacer clic en el botón
closeForm.onclick = function () {
    formulario.style = "none";
}

//Activamos las sugerencias de mail conforme se escribe
EmailSuggestions (emailInput, suggestionsList, dataMail)

const feedbackForm = document.getElementById('feedbackForm');
const processingOverlay = document.getElementById('processingOverlay');

    initializeFormHandler({
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
    });



// ----------- FUNCIONES DE ACTUALIZACIÓN DE DATOS ---------------------

// cambiar los datos del nombre de colaborador en el formulario de envio



// actualizar los datos del usuario que abre la pagina
//console.log('4. Actualizando interfaz');
changeSRC(imgGuest, imagenInvitado)
changeText(myName, nameGuest);
changeText(myJobName, jobNameGuest);

//actualizar los datos de los colaboradores Top del mes en feedback
changeSRC(imgTop1, ImagenTop1)
changeSRC(imgTop2, ImagenTop2)
changeSRC(imgTop3, ImagenTop3)
changeText(nombreTop1, nameTop1);
changeText(nombreTop2, nameTop2);
changeText(nombreTop3, nameTop3);

//actualizar los datos de las Variables Resumen de actividad de feedback
changeText(feedbackRecibidos, totalReceivedFeedback);
changeText(feedbackEnviados, totalSentFeedback);
changeText(totalFeedbackRefuerzoRecibido, totalReinforcementRecivedFeedback);
changeText(totalFeedbackCambioRecibido, totalChangeRecivedFeedback);
changeText(totalFeedbackRefuerzoEnviado, totalReinforcementSentFeedback);
changeText(totalFeedbackCambioEnviado, totalChangeSentFeedback);
changeHeight(porcentajeRefuerzoFeedbackEnviado,percentageReinforcementSentFeedback);
changeHeight(porcentajeCambioFeedbackEnviado,percentageChangeSentFeedback);
changeHeight(porcentajeRefuerzoFeedbackRecibido,percentageReinforcementRecivedFeedback);
changeHeight(porcentajeCambioFeedbackRecibido,percentageChangeRecivedFeedback);

//actualizar los datos de los colaboradores que recibieron feedback recientemente

changeText(receptorFeedback1,feedbackreceiver1);
changeText(receptorFeedback2,feedbackreceiver2);

//actualizar los datos de los colaboradores que enviaron feedback recientemente
changeSRC(fotoUltimosenvios1, imgLatestSenders1);
changeSRC(fotoUltimosenvios2, imgLatestSenders2);
changeSRC(fotoUltimosenvios3, imgLatestSenders3);
changeText(nombreUltimosenvios1, nameLatestSenders1);
changeText(nombreUltimosenvios2, nameLatestSenders2);
changeText(nombreUltimosenvios3, nameLatestSenders3);
changeText(fechaUltimosenvios1, dateLatestSenders1);
changeText(fechaUltimosenvios2, dateLatestSenders2);
changeText(fechaUltimosenvios3, dateLatestSenders3);

//console.log(findData(data, latestFeedback(dataFeedback,1,7),11));

//Todo cargado listo para mostrar la pagina
//console.log('5. Todo listo, mostrando página');

loadingScreen.classList.add('fade-out');
mainContent.classList.add('visible');

} catch (error) {
    console.error('Hubo un error:', error);
    // Mostrar mensaje de error en la pantalla de carga
}
}

/* ------------------------- INITIALIZE APP ------------------------ */

// Iniciamos todo cuando el DOM está listo
document.addEventListener('DOMContentLoaded', initializeApp);