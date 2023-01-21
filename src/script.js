import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input');

input.addEventListener('input', onInputData);
function onInputData(evt) {
  const form = evt.currentTarget;
  console.log(form);
}
fetchCountries();
function fetchCountries(name) {
  return fetch(
    'https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages'
  ).then(resp => resp.json);
}
