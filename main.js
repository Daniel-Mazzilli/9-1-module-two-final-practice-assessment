// URL
const baseURL = `https://ghibliapi.herokuapp.com`;
const getPeople = `/people`;

// Variables
let allPeopleData;

// DOM Elements
const listPeople = document.querySelector(`#list`);
const selectedPerson = document.querySelector(`select`);
const infoSec = document.querySelector(`#info`);

// Fetch
fetch(baseURL + getPeople)
  .then((res) => res.json())
  .then((resJson) => {
    console.log(resJson);
    allPeopleData = resJson;
    resJson.forEach((el) => {
      const character = document.createElement(`option`);
      character.setAttribute(`value`, el[`name`]);
      character.innerText = el[`name`];
      listPeople.append(character);
    });
  })
  .catch((err) => console.log(err));

selectedPerson.addEventListener(`change`, () => {
  console.log(selectedPerson.value);
  infoSec.innerHTML = ``;
  const infoName = document.createElement(`h4`);
  infoName.innerText = selectedPerson.value;
  infoSec.append(infoName);
});
