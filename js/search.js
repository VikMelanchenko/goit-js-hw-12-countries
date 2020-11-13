import debounce from 'lodash.debounce';
import API from '../js/fetchCountries.js';

import cardCountryTmp from '../templates/card-country.hbs';
import cardCountriesListTmp from '../templates/list-countries.hbs';

import { info, error } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import getRefs from '../js/refs.js';

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(() => {
    onSearch();
}, 500),
);

let countryName = '';

function onSearch() {
    countryName = refs.searchInput.value;
    console.log(countryName);

    if (!countryName) {
        clearRenderMarkup();
        return;
    }

    API.fetchCountry(countryName)
        .then(countryCheckControl)
        .catch(onFetchError)
}

    function countryCheckControl(countries) {
    if (countries.length > 10) {
        clearRenderMarkup();
        onErrorCountryNameAmount();
    } else if (countries.length > 1 && countries.length < 10) {
        clearRenderMarkup();
        renderCountryCard(cardCountriesListTmp, countries);
    } else if (countries.length === 1) {
        clearRenderMarkup();
        renderCountryCard(cardCountryTmp, countries[0]);
    } else {
        clearRenderMarkup(); 
        foundError()
    }
}


    function onErrorCountryNameAmount() {
    error({
    title: 'Sorry, friend!',
    text: "To many matches found. Please enter a more specific query!",
    delay: 1500,
  });
}

    function renderCountryCard(handleTemplate, countries) {
    const markup = handleTemplate(countries);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

    function clearRenderMarkup() {
    refs.cardContainer.innerHTML = '';
}

    function onFetchError(error) {
    clearRenderMarkup();
}

function foundError() {
    info({
    title: 'Sorry, friend!',
    text: 'No matches found! Try again!',
    delay: 2500,
  });
}