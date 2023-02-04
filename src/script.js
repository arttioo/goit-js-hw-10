import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
fetchCountries();
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputData, DEBOUNCE_DELAY));
function onInputData(evt) {
  list.innerHTML = '';
  info.innerHTML = '';
  if (input.value.trim() === '') {
    return;
  }
  fetchCountries(input.value).then(arr => {
    console.log(arr.length);

    if (arr.length >= 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (arr.length >= 2 && arr.length < 10) {
      console.log(33);
      createMarkupShort(arr);
    } else if (arr.length === 1) {
      console.log(23);
      createMarkup(arr[0]);
    }
  });
}

function createMarkup({ flags, capital, population, languages, name }) {
  console.log({ flags, capital, population, languages, name });
  const markup = `
  <h2 class=country-name>
    <img src="${flags.svg}" alt="flag" height="30px">
    ${name.official}
  </h2>
  <ul>
    <li><span>capital: </span>${capital.join()}</li>
    <li><span>population: </span>${population}</li>
    <li><span>languages: </span>${Object.values(languages)}</li>
  </ul>`;

  info.insertAdjacentHTML('beforeend', markup);
}

function createMarkupShort(countries) {
  const markup = countries.map(
    country => `
  <h2>
    <img src="${country.flags.svg}" alt="flag" height="30px">
    ${country.name.official}
  </h2>`
  );
  info.insertAdjacentHTML('beforeend', markup);
}
