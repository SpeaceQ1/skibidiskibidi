// Twój klucz API z Football-Data.org
const API_KEY = 'e3d9fd3c7b3c46c4bdddccb95f0574ff';

// URL do API Football-Data.org z wynikami na żywo
const API_URL = 'https://api.football-data.org/v4/matches';

// Funkcja do pobrania wyników meczów
async function getLiveResults() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'X-Auth-Token': API_KEY // Twój klucz API
            }
        });

        const data = await response.json();

        // Sprawdzamy, czy odpowiedź jest prawidłowa
        if (data.matches) {
            displayResults(data.matches);
        } else {
            console.error('Błąd w pobieraniu danych');
        }
    } catch (error) {
        console.error('Błąd: ', error);
    }
}

// Funkcja do wyświetlania wyników meczów
function displayResults(matches) {
    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = ''; // Czyszczenie poprzednich wyników

    matches.forEach(match => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${match.homeTeam.name} vs ${match.awayTeam.name}</span> 
            <span class="score">${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</span>
        `;
        resultsList.appendChild(listItem);
    });
}

// Wywołanie funkcji przy ładowaniu strony
window.onload = function() {
    getLiveResults();
}