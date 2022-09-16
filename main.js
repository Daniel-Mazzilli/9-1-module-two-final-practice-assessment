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

// Event Listener
selectedPerson.addEventListener(`change`, () => {
  const searchName = selectedPerson.value;
  infoSec.innerHTML = ``;

  const infoName = document.createElement(`h4`);
  infoName.innerText = `Name: ` + searchName;

  const pAge = document.createElement(`p`);
  const pEye = document.createElement(`p`);
  const pHair = document.createElement(`p`);

  allPeopleData.forEach((el) => {
    if (el[`name`] === searchName) {
      pAge.innerText = `Age: ` + el[`age`];
      pEye.innerText = `Eye: ` + el[`eye_color`];
      pHair.innerText = `Hair: ` + el[`hair_color`];
    }
  });

  infoSec.append(infoName, pAge, pEye, pHair);
});
