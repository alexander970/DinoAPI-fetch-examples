"use strict";

const createRange = (start, end) =>
  [...Array(end - start + 1).keys()].map((x) => x + start);
const createAlphabeticRange = () =>
  createRange(97, 122).map((code) => String.fromCharCode(code));

const alphabeticRange = createAlphabeticRange();

const fetchEndpoints = alphabeticRange.map((letter) =>
  fetch(`https://dinoapi20220306203523.azurewebsites.net/dinosaurs/${letter}`)
);

const dinosaursList = document.querySelector(".dinosaurs");
function appendDinosaur(genera) {
  const dinosaurElement = document.createElement("li");
  const dinosaursElementText = document.createTextNode(genera);
  dinosaurElement.appendChild(dinosaursElementText);
  dinosaursList.appendChild(dinosaurElement);
}

function appendDinosaurs(generas) {
  generas.forEach(appendDinosaur);
}

Promise.all(fetchEndpoints)
  .then((responses) =>
    Promise.all(responses.map((response) => response.json()))
  )
  .then((data) => {
    const merged = [].concat(...data);
    const generas = merged.map((dinosaur) => dinosaur.genera);
    appendDinosaurs(generas);
  })
  .catch((error) => console.error(error));
