
import cardCountryTmp from './templates/card-country.hbs';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchInput: document.querySelector('.js-search-input')
}

fetchCountry()
    .then(renderCountryCard)
    .catch(error => {
        console.log(error);
    });



    fetchCountry()
    .then(renderCountryCard)
    .catch(error => {
        console.log(error);
    });

function fetchCountry() {
    return fetch('https://restcountries.eu/rest/v2/name/all').then(response => {
        return response.json();
    });
}
function renderCountryCard(name) {
        const markup = cardCountryTmp(name[0]);
        refs.cardContainer.innerHTML = markup;
    }