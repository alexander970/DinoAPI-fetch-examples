"use strict";

/*fetch('https://dinoapi20220306203523.azurewebsites.net/dinosaurs/a') 
.then(response =>response.json())
.then(data=>console.log(data));*/

const createRange = (start, end) =>
  [...Array(end - start + 1).keys()].map((x) => x + start);
const createAlphabeticRange = () =>
  createRange(97, 122).map((code) => String.fromCharCode(code));

const alphabeticRange = createAlphabeticRange();

const fetchEndpoints = alphabeticRange.map((letter) =>
  fetch(`https://dinoapi20220306203523.azurewebsites.net/dinosaurs/${letter}`)
);

Promise.all(fetchEndpoints).then((responses) => {
  console.log(responses);
});
