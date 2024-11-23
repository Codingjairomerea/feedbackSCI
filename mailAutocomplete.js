export function EmailSuggestions(emailInput, suggestionsList, dataMail) {
    emailInput.addEventListener('input', function () {
        const inputValue = emailInput.value.toLowerCase();
        suggestionsList.innerHTML = ''; // Limpiamos las sugerencias previas
        suggestionsList.style.display = 'none'; // Ocultamos la lista si no hay sugerencias

        if (inputValue) {
            // Filtramos los correos que contienen el valor del input
            const filteredMails = dataMail.filter(mail =>
                mail.toLowerCase().includes(inputValue)
            ).slice(0, 5); // Limita las sugerencias a 5 resultados

            // Si hay resultados, mostramos la lista
            if (filteredMails.length > 0) {
                filteredMails.forEach(mail => {
                    const listItem = document.createElement('li');
                    listItem.textContent = mail;

                    // Al hacer clic en una sugerencia, completamos el campo de email
                    listItem.addEventListener('click', function () {
                        emailInput.value = mail;
                        suggestionsList.innerHTML = ''; // Limpiamos las sugerencias
                        suggestionsList.style.display = 'none'; // Ocultamos la lista
                    });

                    // Agregamos el ítem a la lista de sugerencias
                    suggestionsList.appendChild(listItem);
                });

                // Mostramos la lista de sugerencias
                suggestionsList.style.display = 'block';
            }
        }
    });

    // Cierra las sugerencias si se hace clic fuera del input o la lista
    document.addEventListener('click', function (e) {
        if (!emailInput.contains(e.target) && !suggestionsList.contains(e.target)) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
        }
    });
}