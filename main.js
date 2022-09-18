// URL
const baseURL = `https://ghibliapi.herokuapp.com`;
const getPeople = `/people`;

// Variables
let allPeopleData;
// let personIndex;

// DOM Elements
const listPeople = document.querySelector(`#list`);
const selectedPerson = document.querySelector(`select`);
const infoSec = document.querySelector(`#info`);
const form = document.querySelector(`form`);
const inputShoutout = document.querySelector(`#shoutout`);
const ul = document.querySelector(`ul`);
const shoutoutsButton = document.querySelector(`#reset-shoutouts`);

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

  const personData = allPeopleData.find(
    (el) => el.name === selectedPerson.value
  );

  pAge.innerText = `Age: ` + personData[`age`];
  pEye.innerText = `Eye: ` + personData[`eye_color`];
  pHair.innerText = `Hair: ` + personData[`hair_color`];

  // allPeopleData.forEach((el) => {
  //   if (el[`name`] === selectedPerson.value) {
  //     pAge.innerText = `Age: ` + el[`age`];
  //     pEye.innerText = `Eye: ` + el[`eye_color`];
  //     pHair.innerText = `Hair: ` + el[`hair_color`];
  //   }
  // });

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
    shoutoutsButton.style.display = `block`;
    form.reset();
  }
});

inputShoutout.addEventListener(`input`, () => {
  error.innerHTML = ``;
});

shoutoutsButton.addEventListener(`click`, () => {
  ul.innerHTML = ``;
  shoutoutsButton.style.display = `none`;
});
