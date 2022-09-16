// URL
const baseURL = `https://ghibliapi.herokuapp.com`;
const getPeople = `/people`;

// Variables
let allPeopleData;
let personIndex;

// DOM Elements
const listPeople = document.querySelector(`#list`);
const selectedPerson = document.querySelector(`select`);
const infoSec = document.querySelector(`#info`);
const form = document.querySelector(`form`);
const inputShoutout = document.querySelector(`#shoutout`);
const ul = document.querySelector(`ul`);

// Error Message
const error = document.createElement(`p`);
error.classList.add(`message`);
form.append(error);

// Fetch
fetch(baseURL + getPeople)
  .then((res) => res.json())
  .then((resJson) => {
    allPeopleData = resJson;
    resJson.forEach((el) => {
      const character = document.createElement(`option`);
      character.setAttribute(`value`, el[`name`]);
      character.innerText = el[`name`];
      listPeople.append(character);
    });
  })
  .catch((err) => console.log(err));

// Event Listeners
selectedPerson.addEventListener(`change`, () => {
  error.innerHTML = ``;
  infoSec.innerHTML = ``;

  const infoName = document.createElement(`h4`);
  infoName.innerText = `Name: ` + selectedPerson.value;

  const pAge = document.createElement(`p`);
  const pEye = document.createElement(`p`);
  const pHair = document.createElement(`p`);

  allPeopleData.forEach((el) => {
    if (el[`name`] === selectedPerson.value) {
      pAge.innerText = `Age: ` + el[`age`];
      pEye.innerText = `Eye: ` + el[`eye_color`];
      pHair.innerText = `Hair: ` + el[`hair_color`];
    }
  });

  infoSec.append(infoName, pAge, pEye, pHair);
});

form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  error.innerHTML = ``;
  if (!selectedPerson.value) {
    error.innerText = `Please Select a Person`;
  } else if (!inputShoutout.value) {
    error.innerText = `Please add a shoutout for ${selectedPerson.value}`;
  } else {
    const shoutout = document.createElement(`li`);
    shoutout.innerHTML = `<strong>${selectedPerson.value}</strong>, ${inputShoutout.value}`;
    ul.append(shoutout);
    form.reset();
  }
});

inputShoutout.addEventListener(`input`, () => {
  error.innerHTML = ``;
});
