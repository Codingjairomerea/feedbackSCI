        // URL del script doGet para obtener los datos
    export  const GET_URL_FEEDBACK = 'https://script.google.com/macros/s/AKfycbzaZXanYaI1OdSX-On_0pKTm8K57bbpTr02juCvh0LIkobZoCJ8pSUPQIfcDer39Tb2/exec?action=getFeedback';

        // Función para obtener datos desde Google Sheets y mostrarlos en la consola
    export  async function getDataFeedback() {
            try {
                const response = await fetch(GET_URL_FEEDBACK, { method: 'GET' });
                const data = await response.json(); // Convertimos la respuesta a JSON
                //console.log(data); // Ver los datos en la consola
                return data
                //console.log('Tipo de data:', typeof data); // Imprime el tipo de data
                //console.dir(data)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
