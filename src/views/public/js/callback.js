import fetchData from "./fetchData.js";
const apiUrl = "https://rickandmortyapi.com/api/character/";

let btnPrev = document.getElementById("btn-prev");
let btnNext = document.getElementById("btn-next");
let characterImage = document.getElementById("characterImage");
let characterName = document.getElementById("char-name");
let characterStatus = document.getElementById("char-status");
let characterSpecies = document.getElementById("char-species");
let characterLocation = document.getElementById("char-location");
let characterFirstSeen = document.getElementById("char-first-seen");
var count = 1;
var maxNum = 0;

//inizialization of first page
fetchData(apiUrl)
  .then((data) => {
    maxNum = data.info.count;
    return fetchData(`${apiUrl}${data.results[0].id}`);//enter the character 1
  })
  .then((data) => {
    characterImage.style.backgroundImage = `url(${data.image})`;
    characterName.innerHTML = data.name;
    characterStatus.innerHTML = data.status;
    characterSpecies.innerHTML = data.species;
    characterLocation.innerHTML = data.location.name;
    return fetchData(`${data.episode[0]}`);
  })
  .then((data) => {
    characterFirstSeen.innerHTML = data.name;
  })
  .catch((error) => console.log(error))

//counter increment & decrement functions
let counterIncrement = (maxNum) => {
  if(count < maxNum) {
    return ++count
  }else{
    return count
  }
}
let counterDecrement = _ => {
  if(count > 1) {
    return --count
  }else{
    return count
  }
}

//buttons mechanism
btnNext.addEventListener("click",() => {
  count = counterIncrement(maxNum);
  fetchData(apiUrl)
    .then((data) => {
      return fetchData(`${apiUrl}${count}`);
    })
    .then((data) => {
      characterImage.style.backgroundImage = `url(${data.image})`;
      characterName.innerHTML = data.name;
      characterStatus.innerHTML = data.status;
      characterSpecies.innerHTML = data.species;
      characterLocation.innerHTML = data.location.name;
      return fetchData(`${data.episode[0]}`)//.com/api/episode/1
    })
    .then((data) => {
      characterFirstSeen.innerHTML = data.name;//name of episode
    })
    .catch((error) => console.log(error))

});

btnPrev.addEventListener("click",() => {
  count = counterDecrement();
  fetchData(apiUrl)
    .then((data) => {
      return fetchData(`${apiUrl}${count}`);
    })
    .then((data) => {
      characterImage.style.backgroundImage = `url(${data.image})`;
      characterName.innerHTML = data.name;
      characterStatus.innerHTML = data.status;
      characterSpecies.innerHTML = data.species;
      characterLocation.innerHTML = data.location.name;
      return fetchData(`${data.episode[0]}`)//.com/api/episode/1
    })
    .then((data) => {
      characterFirstSeen.innerHTML = data.name;//name of episode
    })
    .catch((error) => console.log(error))
});


